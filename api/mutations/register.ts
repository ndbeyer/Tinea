import db from "../db/";
import sql from "sql-tagged-template-literal";
import bcrypt from "bcrypt";
import consts from "../consts";
import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-core";
import { sendConfirmationEmail } from "../utils/nodemailer";

const emailRegExp = new RegExp(
  /^[_A-Za-z0-9-]+([.|+][_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/
);

const validateEmail = (value?: string): boolean => {
  if (!value) return false;
  return emailRegExp.test(value);
};

const validatePassword = (value?: string): boolean =>
  !value || value.length < 8 ? false : true;

const register = async (
  _,
  {
    password,
    email,
    firstName,
    lastName,
    type,
    schoolName,
    userName,
    verificationType,
    termsAccepted,
  }: {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    type: "TEACHER" | "PUPIL";
    schoolName?: string;
    userName?: string;
    verificationType: "NUMBER" | "LINK";
    termsAccepted: boolean;
  }
) => {
  try {
    const emailValid = validateEmail(email);
    if (!emailValid) {
      return new ApolloError("EMAIL_INVALID", "EMAIL_INVALID");
    }
    // TODO: if user does exists
    // if (await doesUserExist(email)) {
    // 	return new ApolloError('EMAIL_ALREADY_TAKEN', 'EMAIL_ALREADY_TAKEN');
    // }
    const passwordValid = validatePassword(password);
    if (!passwordValid) {
      return new ApolloError("PASSWORD_INVALID", "PASSWORD_INVALID");
    }
    if (!termsAccepted) {
      return new ApolloError("TERMS_NOT_ACCEPTED", "TERMS_NOT_ACCEPTED");
    }

    const numberConfirmationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const linkConfirmationCode = jwt.sign({ email }, consts.API_JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 1,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const res = await db.query(sql`
			INSERT INTO "user" 
			(first_name, last_name, email, password, created_at, updated_at, link_confirmation_code, number_confirmation_code, email_confirmed, type, school_name, user_name, terms_accepted_at) 
			VALUES 
			(${firstName}, ${lastName}, ${email}, ${hashedPassword}, now(), now(), ${linkConfirmationCode}, ${numberConfirmationCode}, ${false}, ${type}, ${schoolName}, ${userName}, now()) 
			RETURNING id;
		`);
    await sendConfirmationEmail({
      email,
      linkConfirmationCode,
      numberConfirmationCode,
      verificationType,
    });

    const userId = res.rows[0].id;

    // assign respective free products to new user
    const { id: orderId } =
      (
        await db.query(sql`
			INSERT INTO "order" 
			(user_id, created_at, status)
			VALUES
			(${userId}, 'now()', 'COMPLETE')
			RETURNING id
		`)
      ).rows[0] || {};

    await db.query(sql`
			INSERT INTO "order_vs_product" 
			(order_id, product_id)
			VALUES
			(${orderId}, ${type === "TEACHER" ? 3 : 1})
		`);

    return {
      success: true,
    };
  } catch (e) {
    console.log(">>> register catch error: ", e);
    return new ApolloError("UNEXPECTED_ERROR", "UNEXPECTED_ERROR");
  }
};

export default register;
