import client from '../client';
import { gql } from 'graphql-tag';

type Error = 'INVALID_REFRESH_TOKEN' | 'REFRESH_TOKEN_EXPIRED' | 'NETWORK_ERROR';

const refreshLogin = async ({
	refreshToken,
}: {
	refreshToken: string;
}): Promise<
	| { success: true; error: undefined; jwt: string }
	| { success: false; error: Error; jwt: undefined }
> => {
	try {
		const { data, errors } = await client.mutate({
			mutation: gql`
				mutation RefreshLogin($refreshToken: String!) {
					refreshLogin(refreshToken: $refreshToken) {
						success
						jwt
					}
				}
			`,
			variables: { refreshToken },
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
			jwt: data.refreshLogin.jwt,
		};
	} catch (e: any) {
		if (e && e.networkError) return { success: false, error: 'NETWORK_ERROR', jwt: undefined };
		throw e;
	}
};

export default refreshLogin;
