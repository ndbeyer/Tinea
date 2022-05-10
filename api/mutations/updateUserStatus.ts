import db from '../db';
import { AuthenticationError } from 'apollo-server-core';
import sql from 'sql-tagged-template-literal';

import { Context } from '../typescript-types';

type UserStatus =
	| 'INITIAL'
	| 'QUESTIONAIRE'
	| 'FINISHED_QUESTIONAIRE'
	| 'ORDERED_PRODUCT'
	| 'HAS_PRODUCT';

const updateUserStatus = async (_, { status }: { status: UserStatus }, context: Context) => {
	if (!context.viewer.userId) {
		throw new AuthenticationError('UNAUTHENTICATED');
	}
	await db.query(sql`UPDATE "user" SET status = ${status} WHERE id=${context.viewer.userId}`);
	return {
		success: true,
	};
};

export default updateUserStatus;
