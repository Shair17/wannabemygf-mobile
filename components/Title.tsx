import { Text, View } from 'react-native';

interface Props {
	text?: string;
}

export const Title: React.FC<Props> = ({
	text = '¿QUIERES SER MI NOVIA? :3',
}) => {
	return (
		<View
			style={{
				padding: 24,
				borderRadius: 8,
				borderColor: '#fccde2',
				borderWidth: 4,
				backgroundColor: '#fcefee',
			}}
		>
			<Text style={{ fontSize: 24 }}>{text}</Text>
		</View>
	);
};
