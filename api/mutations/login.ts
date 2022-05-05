import db from '../db/';
import bcrypt from 'bcrypt';
import consts from '../consts';
import jwt from 'jsonwebtoken';
import sql from 'sql-tagged-template-literal';
import { ApolloError } from 'apollo-server-core';
import cryptoRandomString from 'crypto-random-string';

const login = async (_, { email, password }) => {
	console.log('{ email, password }: ', { email, password });
	const res = await db.query(
		sql`SELECT id, password, email_confirmed FROM "user" WHERE email = ${email}`
	);
	if (!res.rows.length) {
		throw new ApolloError('USER_NOT_FOUND', 'USER_NOT_FOUND');
	}
	if (!res.rows[0].email_confirmed) {
		throw new ApolloError('USER_NOT_VERIFIED', 'USER_NOT_VERIFIED');
	}
	const isMatch = await bcrypt.compare(password, res.rows[0].password);
	if (isMatch) {
		const refreshToken = cryptoRandomString({ length: 30 });
		const userId = res.rows[0].id;
		await db.query(sql`
			UPDATE "user" SET 
			refresh_token = ${refreshToken}, 
			refresh_token_valid_until = now() + interval '180 days'
			WHERE id = ${userId} 
		`);
		const payload = { userId };
		const token = jwt.sign(payload, consts.API_JWT_SECRET, {
			expiresIn: 720000,
		});
		return {
			success: true,
			jwt: token,
			refreshToken,
		};
	} else {
		throw new ApolloError('CREDENTIALS_DO_NOT_MATCH', 'CREDENTIALS_DO_NOT_MATCH');
	}
};

export default login;
