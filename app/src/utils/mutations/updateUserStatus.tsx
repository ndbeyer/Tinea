import client from '../client';
import { gql } from 'graphql-tag';
import { User } from '../user';

type Error = 'NETWORK_ERROR' | 'UNAUTHENTICATED';

const updateUserStatus = async ({
	status,
}: {
	status: User['status'];
}): Promise<{ success: true; error: undefined } | { success: false; error: Error }> => {
	try {
		console.log('status', status);
		const { errors } = await client.mutate({
			mutation: gql`
				mutation UpdateUserStatus($status: UserStatus!) {
					updateUserStatus(status: $status) {
						success
					}
				}
			`,
			variables: { status },
			errorPolicy: 'all',
		});
		if (errors) {
			return {
				success: false,
				error: errors[0]?.extensions?.code as Error,
			};
		}
		return {
			success: true,
			error: undefined,
		};
	} catch (e: any) {
		if (e && e.networkError) return { success: false, error: 'NETWORK_ERROR' };
		throw e;
	}
};

export default updateUserStatus;
