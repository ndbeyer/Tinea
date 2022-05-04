//@format
//@flow

import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Text } from 'react-native'; // TODO: replace
import Screen from '../components/Screen';
import Button from '../components/Button';
import Input from '../components/Input';
import Box from '../components/Box';
import { Heading, Paragraph, Label } from '../components/Text';
import login from '../utils/mutations/login';

const StyledScreen = styled(Screen)`
	justify-content: center;
`;

const LoginScreen = (): JSX.Element => {
	const theme = useTheme();

	const [loading, setLoading] = React.useState(false);

	const handleLogin = React.useCallback(async () => {
		setLoading(true);
		// await login('')
		setLoading(false);
	}, []);

	return (
		<StyledScreen>
			<Box
				justifyContent="center"
				alignItems="center"
				borderRadius="1rem"
				p="2rem"
				elevation={1}
				m="1rem"
				bg="background0"
			>
				{/* <Box elevation={1} width="10rem" height="10rem" m="1rem" bg="background0" /> */}
				<Label m="2rem">Registrieren</Label>
				<Box m="3rem 0">
					<Input placeholder="email" m="1rem" />
					<Input placeholder="password" m="1rem" />
					<Box row alignSelf="stretch" width="100%">
						<Button link label="Bereits registriert?" onPress={handleLogin} />
					</Box>
				</Box>

				<Button label="Registrieren" onPress={handleLogin} />
			</Box>
		</StyledScreen>
	);
};

export default LoginScreen;
