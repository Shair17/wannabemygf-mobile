import { useState } from 'react';
import { useInterval } from './useInterval';

export const useCountDown = (initialCount: number = 3) => {
	const [count, setCount] = useState(initialCount);
	const canCountDown = count > 0;

	useInterval(
		() => {
			if (canCountDown) {
				setCount(count - 1);
			}
		},
		canCountDown ? 1000 : null
	);

	return { count, canCountDown };
};
