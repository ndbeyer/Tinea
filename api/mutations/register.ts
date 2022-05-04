import db from '../db/';
import sql from 'sql-tagged-template-literal';
import bcrypt from 'bcrypt';
import { ApolloError } from 'apollo-server-core';
import { sendConfirmationEmail } from '../utils/nodemailer';

const emailRegExp = new RegExp(
	/^[_A-Za-z0-9-]+([.|+][_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/
);

const validateEmail = (value?: string): boolean => {
	if (!value) return false;
	return emailRegExp.test(value);
};

const validatePassword = (value?: string): boolean => (!value || value.length < 8 ? false : true);

const register = async (
	_,
	{
		password,
		email,
		termsAccepted,
	}: {
		password: string;
		email: string;
		termsAccepted: boolean;
	}
) => {
	const emailValid = validateEmail(email);
	if (!emailValid) {
		return new ApolloError('EMAIL_INVALID', 'EMAIL_INVALID');
	}
	const alreadyExists =
		(await db.query(sql`SELECT id FROM "user" WHERE email = ${email}`)).rows.length > 0;
	if (alreadyExists) {
		return new ApolloError('EMAIL_ALREADY_TAKEN', 'EMAIL_ALREADY_TAKEN');
	}
	const passwordValid = validatePassword(password);
	if (!passwordValid) {
		return new ApolloError('PASSWORD_INVALID', 'PASSWORD_INVALID');
	}
	// if (!termsAccepted) {
	// 	return new ApolloError('TERMS_NOT_ACCEPTED', 'TERMS_NOT_ACCEPTED');
	// }

	const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString();
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// create user
	await db.query(sql`
			INSERT INTO "user" 
			(email, password, created_at, updated_at, confirmation_code, email_confirmed, terms_accepted_at) 
			VALUES 
			(${email}, ${hashedPassword}, now(), now(), ${confirmationCode}, ${false}, now())
		`);
	await sendConfirmationEmail({
		email,
		confirmationCode,
	});

	return {
		success: true,
	};
};

export default register;
