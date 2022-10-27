import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

type DimensionsValue = {
	window: ScaledSize;
	screen: ScaledSize;
};

export const useDimensions = (): DimensionsValue => {
	const [dimensions, setDimensions] = useState<DimensionsValue>({
		window: Dimensions.get('window'),
		screen: Dimensions.get('screen'),
	});

	const onChange = ({ window, screen }: DimensionsValue) => {
		setDimensions({ window, screen });
	};

	useEffect(() => {
		const subscription = Dimensions.addEventListener('change', onChange);

		return () => subscription.remove();
	}, []);

	return dimensions;
};
