import { ApolloError } from 'apollo-server-core';
import nodemailer from 'nodemailer';
import CONSTS from '../consts';

const { NODEMAILER_USER, NODEMAILER_PASSWORD, FRONTEND_URL } = CONSTS;

const transport = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: NODEMAILER_USER,
		pass: NODEMAILER_PASSWORD,
	},
});

export const sendConfirmationEmail = async ({
	email,
	linkConfirmationCode,
	numberConfirmationCode,
	verificationType,
}: {
	email: string;
	linkConfirmationCode: string;
	numberConfirmationCode: string;
	verificationType: 'NUMBER' | 'LINK';
}) => {
	const html =
		verificationType === 'LINK'
			? `
		<h1>E-Mail Bestätigung</h1>
		<h2>Willkommen bei Bildungsfreaks!</h2>
		<p>Danke, dass du dich bei uns registriert hast. Bitte verifiziere deine E-Mail Adresse, indem du auf den folgenden Link klickst.</p>
		<a href="${FRONTEND_URL}/confirm/${linkConfirmationCode}">Klicke hier!</a>
	`
			: `
		<h1>E-Mail Bestätigung</h1>
		<h2>Willkommen bei Bildungsfreaks!</h2>
		<p>Danke, dass du dich bei uns registriert hast. Hier erhälst du deinen Email-Verifizierungscode: ${numberConfirmationCode}.</p>
	`;

	try {
		await transport.sendMail({
			from: NODEMAILER_USER,
			to: email,
			subject: 'E-Mail Bestätigung',
			html,
		});
	} catch (err) {
		return new ApolloError('SEND_MAIL_CONFIRMATION_FAILED', 'SEND_MAIL_CONFIRMATION_FAILED');
	}
};
