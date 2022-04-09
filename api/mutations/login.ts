import db from "../db/";
import bcrypt from "bcrypt";
import consts from "../consts";
import jwt from "jsonwebtoken";
import { ApolloError } from "apollo-server-core";

const login = async (_, { email, password }) => {
  const query = `SELECT id, password, email_confirmed FROM "user" WHERE email = $1`;
  try {
    const res = await db.query(query, [email]);
    if (!res.rows.length) {
      return new ApolloError("USER_NOT_FOUND", "USER_NOT_FOUND");
    }
    if (!res.rows[0].email_confirmed) {
      return new ApolloError("USER_NOT_VERIFIED", "USER_NOT_VERIFIED");
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
      return new ApolloError(
        "CREDENTIALS_DO_NOT_MATCH",
        "CREDENTIALS_DO_NOT_MATCH"
      );
    }
  } catch (err) {
    console.log(err);
    return new ApolloError("UNEXPECTED_ERROR", "UNEXPECTED_ERROR");
  }
};

export default login;