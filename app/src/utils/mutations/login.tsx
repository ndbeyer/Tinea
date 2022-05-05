import client from '../client';
import { gql } from '@apollo/client';
import { saveJwtAndFetchUser } from '../user';

type Error =
	| 'USER_NOT_FOUND'
	| 'USER_NOT_VERIFIED'
	| 'CREDENTIALS_DO_NOT_MATCH'
	| 'UNEXPECTED_ERROR'
	| 'NETWORK_ERROR';

const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}): Promise<{ success: true; error: undefined } | { success: false; error: Error }> => {
	try {
		const { data, errors } = await client.mutate({
			mutation: gql`
				mutation Login($email: String!, $password: String!) {
					login(email: $email, password: $password) {
						user {
							id
							email
						}
						success
						jwt
					}
				}
			`,
			variables: { email, password },
			errorPolicy: 'all',
		});
		if (errors) {
			return {
				success: false,
				error: errors[0]?.extensions?.code as Error,
			};
		}
		await saveJwtAndFetchUser(data.login.jwt);
		return {
			success: true,
			error: undefined,
		};
	} catch (e: any) {
		if (e && e.networkError) return { success: false, error: 'NETWORK_ERROR' };
		throw e;
	}
};

export default login;
