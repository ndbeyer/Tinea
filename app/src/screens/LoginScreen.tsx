//@format
//@flow

import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Text } from 'react-native'; // TODO: replace
import Screen from '../components/Screen';
import Button from '../components/Button';
import Input from '../components/Input';
import Box from '../components/Box';
import login from '../utils/mutations/login';

const StyledScreen = styled(Screen)`
	justify-content: center;
`;

const StyledBox = styled(Box)`
	background-color: green;
`;

const LoginScreen = (): JSX.Element => {
	const theme = useTheme();
	console.log('theme: ', theme);

	const [loading, setLoading] = React.useState(false);

	const handleLogin = React.useCallback(async () => {
		setLoading(true);
		// await login('')
		setLoading(false);
	}, []);

	return (
		<StyledScreen>
			<Button label="Login" onPress={handleLogin} />
			<Input placeholder="email" />
			<Input placeholder="password" />
			<Text>LoginScreen</Text>
			<StyledBox />
		</StyledScreen>
	);
};

export default LoginScreen;
