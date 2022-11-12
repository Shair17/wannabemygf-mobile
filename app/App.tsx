import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SocketProvider } from './providers/SocketProvider';
import { WannaBeMineScreen } from './screens/WannaBeMineScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { useSocketStore } from './stores/useSocketStore';

const Stack = createNativeStackNavigator();

export default function App() {
	const username = useSocketStore((s) => s.username);

	return (
		<SocketProvider>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
					initialRouteName={username ? 'WannaBeMineScreen' : 'WelcomeScreen'}
				>
					<Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
					<Stack.Screen
						name="WannaBeMineScreen"
						component={WannaBeMineScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SocketProvider>
	);
}
