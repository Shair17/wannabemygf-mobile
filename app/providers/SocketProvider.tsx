import { Fragment, useEffect } from 'react';
import { useSocketStore } from '../stores/useSocketStore';

export const SocketProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const socket = useSocketStore((s) => s.socket);
	const setOnline = useSocketStore((s) => s.setOnline);

	useEffect(() => {
		setOnline(socket.connected);
	}, [socket]);

	useEffect(() => {
		socket.on('connect', () => {
			setOnline(true);
		});
	}, [socket]);

	useEffect(() => {
		socket.on('disconnect', () => {
			setOnline(false);
		});
	}, [socket]);

	return <Fragment>{children}</Fragment>;
};
