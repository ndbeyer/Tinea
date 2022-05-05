import client from '../client';
import { gql } from 'graphql-tag';

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
}): Promise<
	| { success: true; error: undefined; jwt: string }
	| { success: false; error: Error; jwt: undefined }
> => {
	try {
		const { data, errors } = await client.mutate({
			mutation: gql`
				mutation Login($email: String!, $password: String!) {
					login(email: $email, password: $password) {
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
				jwt: undefined,
			};
		}

		return {
			success: true,
			error: undefined,
			jwt: data.login.jwt,
		};
	} catch (e: any) {
		if (e && e.networkError) return { success: false, error: 'NETWORK_ERROR', jwt: undefined };
		throw e;
	}
};

export default login;
