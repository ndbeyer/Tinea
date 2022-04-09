import { ApolloError } from "apollo-server-core";
import nodemailer from "nodemailer";
import CONSTS from "../consts";

const { NODEMAILER_USER, NODEMAILER_PASSWORD } = CONSTS;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASSWORD,
  },
});

export const sendConfirmationEmail = async ({
  email,
  numberConfirmationCode,
}: {
  email: string;
  numberConfirmationCode: string;
}) => {
  const html = `
		<h1>E-Mail Bestätigung</h1>
		<h2>Willkommen bei Bildungsfreaks!</h2>
		<p>Danke, dass du dich bei uns registriert hast. Hier erhälst du deinen Email-Verifizierungscode: ${numberConfirmationCode}.</p>
	`;

  try {
    await transport.sendMail({
      from: NODEMAILER_USER,
      to: email,
      subject: "E-Mail Bestätigung",
      html,
    });
  } catch (err) {
    return new ApolloError(
      "SEND_MAIL_CONFIRMATION_FAILED",
      "SEND_MAIL_CONFIRMATION_FAILED"
    );
  }
};
