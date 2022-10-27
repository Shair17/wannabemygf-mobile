import { ImageBackground, ImageSourcePropType, View } from 'react-native';

interface Props {
	source: ImageSourcePropType;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({
	children,
	source,
}) => {
	return (
		<ImageBackground
			source={source}
			style={{
				flex: 1,
			}}
			resizeMode="cover"
		>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{children}
			</View>
		</ImageBackground>
	);
};
