import create from 'zustand';
import { combine } from 'zustand/middleware';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../constants/api';

type SocketStoreValues = {
	socket: Socket;
	online: boolean;
	username: string | null;
};

const getDefaultValues = (): SocketStoreValues => {
	return {
		socket: io(SOCKET_URL, {
			transports: ['websocket'],
			autoConnect: true,
			// forceNew: true,
		}),
		online: false,
		username: null,
	};
};

export const useSocketStore = create(
	combine(getDefaultValues(), (set, get) => ({
		setOnline: (online: boolean) => set({ online }),
		setUsername: (username: string | null) => set({ username }),
	}))
);
