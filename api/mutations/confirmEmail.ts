import db from '../db';
import { ApolloError } from 'apollo-server-core';
import sql from 'sql-tagged-template-literal';
import cryptoRandomString from 'crypto-random-string';

import { createJwt } from '../utils/authHelpers';

const confirmEmail = async (_, { confirmationCode, emailAddress }) => {
	const res = await db.query(
		sql`SELECT id, email_confirmed as "emailConfirmed"  FROM "user" WHERE email = ${emailAddress} and confirmation_code = ${confirmationCode}`
	);
	if (!res.rows.length) {
		throw new ApolloError('CONFIRMATION_CODE_INVALID', 'CONFIRMATION_CODE_INVALID');
	}
	if (res.rows[0].emailConfirmed) {
		throw new ApolloError('EMAIL_ALREADY_CONFIRMED', 'EMAIL_ALREADY_CONFIRMED');
	}
	const refreshToken = cryptoRandomString({ length: 30 });
	const userId = (
		await db.query(
			sql`UPDATE "user" SET 
			email_confirmed = true, 
			refresh_token = ${refreshToken}, 
			refresh_token_valid_until = now() + interval '180 days'
			WHERE confirmation_code = ${confirmationCode} 
			RETURNING id
		`
		)
	).rows[0]?.id;
	const jwt = createJwt({ userId });
	return {
		success: true,
		jwt,
		refreshToken,
	};
};

export default confirmEmail;
