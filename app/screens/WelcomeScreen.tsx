import { useState } from 'react';
import {
	View,
	Text,
	TextInput,
	useColorScheme,
	TouchableOpacity,
	Alert,
	Linking,
} from 'react-native';
import { API_URL } from '../constants/api';
import { USERNAME_REGEX } from '../constants/regex';
import { useSocketStore } from '../stores/useSocketStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

const Separator = () => <View style={{ marginVertical: 15 }} />;

type Props = NativeStackScreenProps<any, any>;

export const WelcomeScreen = ({ navigation }: Props) => {
	const [usernameState, setUsernameState] = useState<string>('');
	const systemTheme = useColorScheme();
	const setUsername = useSocketStore((s) => s.setUsername);

	const handleSetUsername = () => {
		if (!usernameState || !USERNAME_REGEX.test(usernameState)) {
			Alert.alert('Error', 'Por favor ingresa un nombre de usuario correcto.');
			return;
		}

		fetch(`${API_URL}/api/wannabemine/${usernameState}`)
			.then(async (response) => {
				const data = await response.json();
				const isError =
					data?.error && (data?.statusCode === 400 || data?.statusCode === 404);

				if (isError) {
					Alert.alert('Error', data.message || 'Ocurrió un error inesperado.');

					return;
				}

				const CanContinue = data?.username === usernameState;

				if (!CanContinue) {
					Alert.alert('Error', 'Ocurrió un error inesperado.');

					return;
				}

				setUsername(data.username);
				navigation.push('WannaBeMineScreen');
			})
			.catch(() => {
				Alert.alert('Error', 'Ocurrió un error inesperado.');
			});
	};

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				paddingHorizontal: 32,
				backgroundColor: systemTheme === 'dark' ? '#18181b' : '#fafafa',
			}}
		>
			<Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
				Hola, ingresa el nombre de usuario de la persona que te envío la
				aplicación.
			</Text>

			<Separator />

			<TextInput
				style={{
					height: 40,
					borderWidth: 1,
					borderColor: '#2563eb',
					padding: 10,
					width: '90%',
					borderRadius: 4,
				}}
				onChangeText={setUsernameState}
				value={usernameState}
				selectionColor="gray"
				placeholder="Ejemplo: shair.dev"
				autoCapitalize="none"
			/>

			<Separator />

			<TouchableOpacity
				onPress={handleSetUsername}
				activeOpacity={0.8}
				style={{
					backgroundColor: '#2563eb',
					paddingHorizontal: 15,
					paddingVertical: 10,
					borderRadius: 4,
				}}
			>
				<Text style={{ color: '#fff' }}>Ingresar</Text>
			</TouchableOpacity>

			<View
				style={{
					position: 'absolute',
					bottom: 16,
				}}
			>
				<View style={{ flexDirection: 'row' }}>
					<Text
						style={{
							textAlign: 'center',
							color: '#111827',
						}}
					>
						Creado por{' '}
					</Text>
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => Linking.openURL('https://instagram.com/shair.dev')}
					>
						<Text style={{ color: '#2563eb', fontWeight: '600' }}>Shair</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};
