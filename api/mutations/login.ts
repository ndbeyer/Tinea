import db from '../db/';
import bcrypt from 'bcrypt';
import consts from '../consts';
import jwt from 'jsonwebtoken';
import sql from 'sql-tagged-template-literal';
import { ApolloError } from 'apollo-server-core';

import User from '../classes/User';

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
		const userId = res.rows[0].id;
		const payload = { userId };
		const token = jwt.sign(payload, consts.API_JWT_SECRET, {
			expiresIn: 720000,
		});
		return {
			success: true,
			jwt: token,
		};
	} else {
		throw new ApolloError('CREDENTIALS_DO_NOT_MATCH', 'CREDENTIALS_DO_NOT_MATCH');
	}
};

export default login;
