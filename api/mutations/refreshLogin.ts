import db from '../db';
import sql from 'sql-tagged-template-literal';
import { ApolloError } from 'apollo-server-core';
import { createJwt } from '../utils/authHelpers';

const refreshLogin = async (_, { refreshToken }) => {
	const res = await db.query(
		sql`SELECT id, refresh_token_valid_until > now() AS "refreshTokenValid" FROM "user" WHERE refresh_token = ${refreshToken} `
	);
	if (!res.rows.length) {
		throw new ApolloError('INVALID_REFRESH_TOKEN', 'INVALID_REFRESH_TOKEN');
	}
	if (!res.rows[0].refreshTokenValid) {
		throw new ApolloError('REFRESH_TOKEN_EXPIRED', 'REFRESH_TOKEN_EXPIRED');
	}

	const userId = res.rows[0].id;

	const payload = { userId };
	const jwt = createJwt(payload);
	return {
		success: true,
		jwt,
	};
};

export default refreshLogin;
