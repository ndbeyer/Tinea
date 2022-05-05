import client from '../client';
import { gql } from '@apollo/client';

type ErrorType =
	| 'UNEXPECTED_ERROR'
	| 'EMAIL_ALREADY_TAKEN'
	| 'NETWORK_ERROR'
	| 'EMAIL_INVALID'
	| 'PASSWORD_INVALID'
	| 'TERMS_NOT_ACCEPTED'
	| 'SEND_CONFIRMATION_EMAIL_FAILED';

const register = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<{ success: true; error: undefined } | { success: false; error: ErrorType }> => {
	try {
		const { errors } = await client.mutate({
			mutation: gql`
				mutation Register($email: String!, $password: String!) {
					register(email: $email, password: $password) {
						success
					}
				}
			`,
			variables: {
				email,
				password,
			},
			errorPolicy: 'all',
		});
		if (errors) {
			return { success: false, error: errors[0]?.extensions?.code as ErrorType };
		}
		return { success: true, error: undefined };
	} catch (e: any) {
		if (e && e.networkError) return { success: false, error: 'NETWORK_ERROR' };
		throw e;
	}
};

export default register;
