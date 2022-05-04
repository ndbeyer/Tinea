import client from '../client';
import { gql } from '@apollo/client';
import EncryptedStorage from 'react-native-encrypted-storage';
import { fetchUser, setToken } from '../user';

const saveJwt = async (jwt: string): Promise<{ success: boolean }> => {
	try {
		await EncryptedStorage.setItem('jwt', jwt);
		return { success: true };
		// eslint-disable-next-line no-catch-all/no-catch-all
	} catch (error) {
		return { success: false };
	}
};

type Error =
	| 'NETWORK_ERROR'
	| 'CONFIRMATION_CODE_INVALID'
	| 'EMAIL_ALREADY_CONFIRMED'
	| 'UNEXPECTED_ERROR'
	| 'CONFIRMATION_CODE_EXPIRED'
	| 'SAVE_JWT_ERROR';

const confirmEmail = async (
	emailAddress: string,
	confirmationCode: string
): Promise<{ success: true; error: undefined } | { success: false; error: Error }> => {
	try {
		// @ts-ignore
		const { data, errors } = await client.mutate({
			mutation: gql`
				mutation ConfirmEmail($confirmationCode: String!, $emailAddress: String!) {
					confirmEmail(confirmationCode: $confirmationCode, emailAddress: $emailAddress) {
						success
						jwt
					}
				}
			`,
			variables: { confirmationCode, emailAddress },
		});
		if (errors) {
			return { success: false, error: errors[0]?.extensions?.code as Error };
		}
		const { success } = await saveJwt(data.confirmEmail.jwt);
		setToken(data.confirmEmail.jwt);
		if (success) {
			console.log('saveJwt success: ', success);
			await fetchUser();
			return {
				success: true,
				error: undefined,
			};
		} else {
			return {
				success: false,
				error: 'SAVE_JWT_ERROR',
			};
		}
	} catch (e) {
		if (e && e.networkError) return { success: false, error: 'NETWORK_ERROR' };
		throw e;
	}
};

export default confirmEmail;
