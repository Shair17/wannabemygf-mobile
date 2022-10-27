import { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Button } from './components/Button';
import { useWannaBeMine } from './hooks/useWannaBeMine';
import { Overlay } from './components/Overlay';
import { Title } from './components/Title';
import { Container } from './components/Container';
// import { useInterval } from './hooks/useInterval';

export default function App() {
	const { coords, visible, setVisible, handleYes, handleNo } = useWannaBeMine();

	// Useful for make calls to handleNo in an interval
	// useInterval(handleNo, 500);

	return (
		<Fragment>
			<StatusBar hidden />

			<Container source={require('./assets/bg.jpg')}>
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
}
