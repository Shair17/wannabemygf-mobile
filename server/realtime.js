const fp = require('fastify-plugin');
const database = require('./database');

const realtime = fp(async (app, options) => {
	app.decorate('io', require('socket.io')(app.server, options));

	// Events
	app.io.on('connection', (socket) => {
		socket.on('SAID_YES', (username) => {
			const foundIndex = database.findIndex(
				(wannabemine) => wannabemine.username === username
			);

			if (foundIndex === -1) return;

			database[foundIndex] = {
				...database[foundIndex],
				attemptsToYes: database[foundIndex].attemptsToYes + 1,
			};

			// Note that the entire array will be broadcast to all clients when user app says ´yes´..
			// This can be fixed by joining the user to rooms,
			// but since it's a simple example, I'll leave it at that for now.
			app.io.emit('WANNABEMINE_LIST', database);
		});

		socket.on('SAID_NO', (username) => {
			const foundIndex = database.findIndex(
				(wannabemine) => wannabemine.username === username
			);

			if (foundIndex === -1) return;

			database[foundIndex] = {
				...database[foundIndex],
				attemptsToNot: database[foundIndex].attemptsToNot + 1,
			};

			// Note that the entire array will be broadcast to all clients when user app says ´no´.
			// This can be fixed by joining the user to rooms,
			// but since it's a simple example, I'll leave it at that for now.
			app.io.emit('WANNABEMINE_LIST', database);
		});
	});

	app.addHook('onClose', (app, done) => {
		app.io.close();
		done();
	});
});

module.exports = realtime;
