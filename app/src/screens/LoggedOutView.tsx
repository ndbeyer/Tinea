//@format
//@flow

import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native'; // TODO: replace

import Screen from '../components/Screen';
import Button from '../components/Button';
import Dialog from '../components/Dialog';
import Input from '../components/Input';
import Box from '../components/Box';
import { Label } from '../components/Text';
import register from '../utils/mutations/register';
import login from '../utils/mutations/login';
import confirmEmail from '../utils/mutations/confirmEmail';
import { saveTokensAndFetchUser } from '../utils/user';

const StyledScreen = styled(Screen)`
	justify-content: center;
`;

const Wrapper = styled(Box).attrs({
	p: '2rem',
	borderRadius: '1rem',
	elevation: 1,
	bg: 'background0',
})`
	justify-content: center;
	align-items: center;
`;

const errorDict = {
	EMAIL_ALREADY_TAKEN: 'Diese Emailadresse wird bereits verwendet',
	EMAIL_INVALID: 'Keine gültige Email',
	PASSWORD_INVALID: 'Ungültiges Passwort',
	NETWORK_ERROR: 'Netzwerkfehler',
	TERMS_NOT_ACCEPTED: 'Datenschutzbestimmungen und Nutzungbedingungen nicht zugestimmt',
	CONFIRMATION_CODE_EXPIRED: 'Bestätigungscode abgelaufen',
	SEND_CONFIRMATION_EMAIL_FAILED: 'Bestätigungsemail konnte nicht gesendet werden.',
	UNEXPECTED_ERROR: 'Unerwarteter Fehler',
	CONFIRMATION_CODE_INVALID: 'Bestätigungscode ungültig',
	EMAIL_ALREADY_CONFIRMED: 'Email bereits bestätigt',
	EMAIL_NOT_EXISTENT: 'Diese Emailadresse ist uns leider nicht bekannt.',
	SAVE_JWT_ERROR: 'Fehler beim Speichern des JWT',
	USER_NOT_FOUND: 'Nutzer nicht gefunden',
	USER_NOT_VERIFIED: 'Nutzer nicht verifiziert',
	CREDENTIALS_DO_NOT_MATCH: 'Email und Passwort passen nicht zusammen',
};

const LoginScreen = ({ navigation }): JSX.Element => {
	const [mode, setMode] = React.useState<'REGISTER' | 'CONFIRMATION' | 'LOGIN'>('LOGIN');
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [code, setCode] = React.useState<string>('');
	const [loading, setLoading] = React.useState(false);

	const handleToggleMode = React.useCallback(() => {
		const newMode = mode === 'REGISTER' ? 'LOGIN' : 'REGISTER';
		setMode(newMode);
	}, [mode]);

	const handleLogin = React.useCallback(async () => {
		setLoading(true);
		const { success, error, jwt, refreshToken } = await login({ email, password });
		setLoading(false);
		if (success) {
			await saveTokensAndFetchUser({ jwt, refreshToken });
		} else {
			Dialog.render({
				title: 'Fehler',
				description: errorDict[error] || errorDict['UNEXPECTED_ERROR'],
			});
		}
	}, [email, password]);

	const handleRegister = React.useCallback(async () => {
		setLoading(true);
		const { success, error } = await register({ email, password });
		setLoading(false);
		if (success) {
			Dialog.render({
				title: 'Bestätigungsemail gesendet',
				description:
					'Wir haben Ihnen soeben eine Bestätigungsemail mit einem Code geschickt. Bitte tragen Sie den Code im nächsten Schritt ein, um den Registrierprozess zu beenden.',
			});
			setMode('CONFIRMATION');
		} else {
			Dialog.render({
				title: 'Fehler',
				description: errorDict[error] || errorDict['UNEXPECTED_ERROR'],
			});
		}
	}, [email, password]);

	const handleConfirm = React.useCallback(async () => {
		setLoading(true);
		const { success, error, jwt, refreshToken } = await confirmEmail(email, code);
		setLoading(false);
		if (success) {
			await saveTokensAndFetchUser({ jwt, refreshToken });
		} else {
			Dialog.render({
				title: 'Fehler',
				description: errorDict[error] || errorDict['UNEXPECTED_ERROR'],
			});
		}
	}, [code, email]);

	return (
		<StyledScreen>
			<Image source={require('../assets/Tinea.png')} />
			<Wrapper m="1rem">
				{mode === 'REGISTER' || mode === 'CONFIRMATION' ? (
					<>
						<Label m="2rem">Registrieren</Label>
						<Box m="3rem 0">
							<Input
								placeholder="Email"
								m="1rem"
								onChange={setEmail}
								disabled={mode === 'CONFIRMATION' || loading}
							/>
							<Input
								placeholder="Passwort"
								m="1rem"
								onChange={setPassword}
								disabled={mode === 'CONFIRMATION' || loading}
								password
							/>
							{mode === 'CONFIRMATION' ? (
								<Input placeholder="Code" m="1rem" onChange={setCode} disabled={loading} />
							) : null}
							{mode === 'REGISTER' ? (
								<Box row alignSelf="stretch" width="100%">
									<Button link label="Bereits registriert?" onPress={handleToggleMode} />
								</Box>
							) : null}
						</Box>
						{mode === 'REGISTER' ? (
							<Button label="Registrieren" onPress={handleRegister} loading={loading} />
						) : (
							<Button label="Bestätigen" onPress={handleConfirm} loading={loading} />
						)}
					</>
				) : (
					<>
						<Label m="2rem">Einloggen</Label>
						<Box m="3rem 0">
							<Input placeholder="email" m="1rem" onChange={setEmail} />
							<Input placeholder="password" m="1rem" password onChange={setPassword} />
							<Box row alignSelf="stretch" width="100%">
								<Button link label="Noch kein Konto?" onPress={handleToggleMode} />
							</Box>
						</Box>

						<Button label="Einloggen" onPress={handleLogin} />
					</>
				)}
			</Wrapper>
		</StyledScreen>
	);
};

export default LoginScreen;
