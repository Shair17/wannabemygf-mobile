import { Fragment } from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Container } from '../components/Container';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { Overlay } from '../components/Overlay';
import { useWannaBeMine } from '../hooks/useWannaBeMine';
// import { useInterval } from '../hooks/useInterval';

export const WannaBeMineScreen = () => {
	const { coords, visible, setVisible, handleYes, handleNo } = useWannaBeMine();

	// Useful for make calls to handleNo in an interval
	// useInterval(handleNo, 1500);

	return (
		<Fragment>
			<StatusBar hidden />

			<Container source={require('../assets/bg.jpg')}>
				<Title text="¿QUIERES SER MI NOVIO? :3" />

				<View style={{ marginTop: 32, alignSelf: 'center' }}>
					<View>
						<View>
							<Button
								pressableProps={{
									onPressIn: handleYes,
								}}
							>
								Joder, síii!
							</Button>
						</View>

						<View style={{ position: 'absolute' }}>
							<View
								style={{
									top: coords.y,
									left: coords.x,
								}}
							>
								<Button
									pressableProps={{
										onPressIn: handleNo,
									}}
								>
									No
								</Button>
							</View>
						</View>
					</View>
				</View>
			</Container>

			{/** This is needed for unmount component get works! */}
			{visible ? <Overlay visible={visible} setVisible={setVisible} /> : null}
		</Fragment>
	);
};
