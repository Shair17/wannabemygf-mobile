import { useEffect } from 'react';
import { BackHandler, Image, Text, View } from 'react-native';
import { useCountDown } from '../hooks/useCountDown';
import { Modal, Props as ModalProps } from './Modal';

export const Overlay: React.FC<Omit<ModalProps, 'canCountDown'>> = ({
	visible,
	setVisible,
}) => {
	const { count, canCountDown } = useCountDown(3);

	useEffect(() => {
		if (!canCountDown && visible) {
			BackHandler.exitApp();
		}

		return () => {
			setVisible(!visible);
		};
	}, [canCountDown, visible]);

	return (
		<Modal
			visible={visible}
			setVisible={setVisible}
			canCountDown={canCountDown}
		>
			<View>
				<Image
					source={require('../assets/bob-esponja.jpg')}
					resizeMode="cover"
				/>
				<Text
					style={{
						marginTop: 18,
						fontWeight: 'bold',
						fontSize: 18,
						textAlign: 'center',
					}}
				>
					Sabía que dirías que si 7u7
				</Text>
				<Text
					style={{
						marginTop: 18,
						fontSize: 10,
						textAlign: 'center',
						color: '#808080',
					}}
				>
					La aplicación se cerrará en {count}
				</Text>
			</View>
		</Modal>
	);
};
