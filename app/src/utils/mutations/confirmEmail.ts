import client from '../client';
import { gql } from '@apollo/client';

type Error =
	| 'NETWORK_ERROR'
	| 'CONFIRMATION_CODE_INVALID'
	| 'EMAIL_ALREADY_CONFIRMED'
	| 'UNEXPECTED_ERROR'
	| 'CONFIRMATION_CODE_EXPIRED';

const confirmEmail = async (
	emailAddress: string,
	confirmationCode: string
): Promise<
	| { success: true; error: undefined; jwt: string }
	| { success: false; error: Error; jwt: undefined }
> => {
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
		console.log(' { data, errors }: ', { data, errors });
		if (errors) {
			return { success: false, error: errors[0]?.extensions?.code as Error, jwt: undefined };
		}
		return {
			success: true,
			error: undefined,
			jwt: data.confirmEmail.jwt,
		};
	} catch (e) {
		if (e && e.networkError) return { success: false, error: 'NETWORK_ERROR', jwt: undefined };
		throw e;
	}
};

export default confirmEmail;
