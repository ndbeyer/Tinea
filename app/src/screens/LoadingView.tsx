//@format
//@flow

import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Text } from 'react-native'; // TODO: replace
import Screen from '../components/Screen';

const StyledScreen = styled(Screen)`
	justify-content: center;
`;

const LoadingView = (): JSX.Element => {
	return (
		<StyledScreen>
			<Text>LoadingView</Text>
		</StyledScreen>
	);
};

export default LoadingView;
