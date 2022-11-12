const { fastify } = require('fastify');
const database = require('./database');
const path = require('path');
const { USERNAME_REGEX } = require('./regex');

const app = fastify({
	logger: true,
	disableRequestLogging: true,
});

app.register(require('@fastify/static'), {
	root: path.join(__dirname, 'public'),
	prefix: '/',
});

app.register(require('./realtime'));

app.get('/u', async (request, reply) => reply.sendFile('u.html'));

app.get('/u/:username', async (request, reply) => {
	return reply.sendFile('username.html');
});

app.get('/api/wannabemine', async () => {
	return database;
});

app.get('/api/wannabemine/:username', async (request, reply) => {
	const username = request.params.username;

	if (!username) {
		return reply.code(400).send({
			error: 'Bad Request',
			statusCode: 400,
			message: 'Por favor ingresa un nombre de usuario.',
		});
	}

	const found = database.find(
		(wannabemine) => wannabemine.username === username
	);

	if (!found) {
		return reply.code(404).send({
			error: 'Not Found',
			statusCode: 404,
			message: `Datos asociados con el usuario '${username}' no fueron encontrados.`,
		});
	}

	return found;
});

app.post('/api/wannabemine', (request, reply) => {
	const username = request.body.username;

	if (!username) {
		return reply.code(400).send({
			error: 'Bad Request',
			statusCode: 400,
			message: 'Por favor ingresa un nombre de usuario.',
		});
	}

	if (!USERNAME_REGEX.test(username)) {
		return reply.code(400).send({
			error: 'Bad Request',
			statusCode: 400,
			message:
				'Por favor usa un nombre de usuario sin espacios (como en TikTok, Instagram, etc).',
		});
	}

	const found = database.find(
		(wannabemine) => wannabemine.username === username
	);

	if (found) {
		return reply.code(400).send({
			error: 'Bad Request',
			statusCode: 400,
			message: `Por favor ingresa otro nombre de usuario, '${username}' ya está en uso.`,
		});
	}

	database.push({
		username,
		attemptsToNot: 0,
		attemptsToYes: 0,
	});

	return {
		success: true,
		username,
		attemptsToNot: 0,
		attemptsToYes: 0,
	};
});

app.delete('/api/wannabemine/:username', async (request, reply) => {
	const username = request.params.username;

	if (!username) {
		return reply.code(400).send({
			error: 'Bad Request',
			statusCode: 400,
			message: 'Por favor ingresa un nombre de usuario.',
		});
	}

	const foundIndex = database.findIndex(
		(wannabemine) => wannabemine.username === username
	);

	if (foundIndex === -1) {
		return reply.code(404).send({
			error: 'Not Found',
			statusCode: 404,
			message: `Datos asociados con el usuario '${username}' no fueron encontrados.`,
		});
	}

	database.splice(foundIndex, 1);

	return {
		success: true,
		message: `Datos asociados con el usuario '${username}' fueron eliminados correctamente.`,
	};
});

app.listen({
	port: process.env.PORT || 3000,
	host: '0.0.0.0',
});
