import db from '../db/';
import bcrypt from 'bcrypt';
import consts from '../consts';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-core';

const login = async (_, { email, password }) => {
	const query = `SELECT id, password, email_confirmed FROM "user" WHERE email = $1`;
	try {
		const res = await db.query(query, [email]);
		if (!res.rows.length) {
			return new ApolloError('User not found', 'USER_NOT_FOUND');
		}
		if (!res.rows[0].email_confirmed) {
			return new ApolloError('Account not active. Please verify your e-Mail.', 'USER_NOT_VERIFIED');
		}

		const isMatch = await bcrypt.compare(password, res.rows[0].password);
		if (isMatch) {
			const userId = res.rows[0].id;
			const userRoles = (
				await db.query(`SELECT role from "user_role" WHERE user_id = $1`, [userId])
			).rows.map(({ role }) => role);
			const payload = { userId, roles: userRoles };
			const token = jwt.sign(payload, consts.API_JWT_SECRET, { expiresIn: 720000 });
			return {
				success: true,
				jwt: token,
			};
		} else {
			return new ApolloError("Credentials don't match", 'CREDENTIALS_DO_NOT_MATCH');
		}
	} catch (err) {
		console.log(err);
		return new ApolloError('Unexpected Error', 'UNEXPECTED_ERROR');
	}
};

export default login;
