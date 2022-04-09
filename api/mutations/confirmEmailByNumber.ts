import db from "../db";
import consts from "../consts";
import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-core";
import sql from "sql-tagged-template-literal";

const confirmEmailByNumber = async (
  _,
  { numberConfirmationCode, emailAddress }
) => {
  try {
    const res = await db.query(
      sql`SELECT id, email_confirmed as "emailConfirmed"  FROM "user" WHERE email = ${emailAddress} and number_confirmation_code = ${numberConfirmationCode}`
    );
    if (!res.rows.length) {
      return new ApolloError(
        "CONFIRMATION_CODE_INVALID",
        "CONFIRMATION_CODE_INVALID"
      );
    }
    if (res.rows[0].emailConfirmed) {
      return new ApolloError(
        "EMAIL_ALREADY_CONFIRMED",
        "EMAIL_ALREADY_CONFIRMED"
      );
    }
    const userId = (
      await db.query(
        sql`UPDATE "user" SET email_confirmed = true WHERE number_confirmation_code = ${numberConfirmationCode} RETURNING id`
      )
    ).rows[0]?.id;

    const payload = { userId };
    const token = jwt.sign(payload, consts.API_JWT_SECRET, {
      expiresIn: 720000,
    });
    return {
      success: true,
      jwt: token,
    };
  } catch (e) {
    return new ApolloError("UNEXPECTED_ERROR", "UNEXPECTED_ERROR");
  }
};

export default confirmEmailByNumber;
