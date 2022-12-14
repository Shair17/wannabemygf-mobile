import { useState } from 'react';
import { Alert } from 'react-native';
import { useSocketStore } from '../stores/useSocketStore';
import { getRandomNumber } from '../utils/getRandomNumber';
import { useBackHandler } from './useBackHandler';
import { useDimensions } from './useDimensions';

export const useWannaBeMine = () => {
	const [visible, setVisible] = useState(false);
	const { window } = useDimensions();
	const [coords, setCoords] = useState<{ x: number; y: number }>({
		x: 0,
		y: 70,
	});
	const socket = useSocketStore((s) => s.socket);
	const username = useSocketStore((s) => s.username);

	const handleYes = () => {
		setVisible(true);
		socket.emit('SAID_YES', username);
	};

	const handleNo = () => {
		const { width, height } = window;

		const x = width / 2 - 75;
		const _x = x - x * 2;
		const y = height / 2 - 70;
		const _y = y - y * 2;

		setCoords({
			x: getRandomNumber(_x, x),
			y: getRandomNumber(_y, y),
		});

		socket.emit('SAID_NO', username);
	};

	// Callback function for back action
	const backActionHandler = () => {
		Alert.alert(
			'Tienes que decir que sí :)',
			'No puedes irte sin antes decir que sí muajajaja :)',
			[
				{
					text: 'Está bien',
					style: 'cancel',
				},
			]
		);
		return true;
	};

	useBackHandler(backActionHandler);

	return {
		visible,
		setVisible,
		coords,
		handleYes,
		handleNo,
	};
};
