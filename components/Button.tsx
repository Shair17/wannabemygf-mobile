import {
	Text,
	TextProps,
	Pressable,
	PressableProps,
	StyleSheet,
} from 'react-native';

interface Props {
	children: string;
	textProps?: TextProps;
	pressableProps?: PressableProps;
}

export const Button: React.FC<Props> = ({
	textProps,
	pressableProps,
	children,
}) => {
	return (
		<Pressable style={({ pressed }) => [styles.button]} {...pressableProps}>
			<Text
				style={{
					color: '#fff',
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: 16,
				}}
				{...textProps}
			>
				{children}
			</Text>
		</Pressable>
	);
};

export const styles = StyleSheet.create({
	button: {
		padding: 15,
		backgroundColor: '#fc5c9c',
		borderColor: '#fccde2',
		borderWidth: 2,
		borderRadius: 8,
		width: 150,
	},
});
