import { useState, useEffect, useImperativeHandle } from 'react';
import {
	Modal as RNModal,
	View,
	TouchableWithoutFeedback,
	StyleSheet,
} from 'react-native';

export interface Props {
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	canCountDown: boolean;
}

export const Modal: React.FC<React.PropsWithChildren<Props>> = ({
	visible,
	setVisible,
	children,
	canCountDown,
}) => {
	return (
		<RNModal
			visible={visible}
			onRequestClose={!canCountDown ? () => setVisible(false) : undefined}
			transparent
			animationType="fade"
		>
			<TouchableWithoutFeedback>
				<View style={styles.modal}>
					<TouchableWithoutFeedback>
						<View style={styles.container}>{children}</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</RNModal>
	);
};

const styles = StyleSheet.create({
	modal: {
		backgroundColor: 'rgba(17, 24, 39, 0.5)',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		backgroundColor: '#fff',
		width: '80%',
		padding: 24,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
