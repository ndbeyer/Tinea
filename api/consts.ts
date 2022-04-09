import dotenv from "dotenv";
dotenv.config();

// ENVIRONMENT VARIABLES
export const DEVELOPMENT =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";
const API_DEVELOPMENT_PORT = 3000;
const consts = {
  // BASIC
  DEVELOPMENT,
  PORT: DEVELOPMENT ? API_DEVELOPMENT_PORT : process.env.PORT,
  API_BASE_URL: DEVELOPMENT
    ? `http://localhost:${API_DEVELOPMENT_PORT}`
    : "https://<NOT_DEFINED>.com",
  API_DB_CONNECTION_STRING: DEVELOPMENT ? undefined : process.env.DATABASE_URL,
  API_DB_PORT: DEVELOPMENT ? 5432 : undefined,
  API_DB_HOST: DEVELOPMENT ? "localhost" : undefined,
  API_DB_DATABASE: DEVELOPMENT ? "tinea_api" : undefined,
  API_DB_USER: DEVELOPMENT ? process.env.DB_USER : undefined,
  API_DB_PASSWORD: DEVELOPMENT ? "" : undefined,
  API_JWT_SECRET: process.env.API_JWT_SECRET
    ? process.env.API_JWT_SECRET
    : "superSecretJwtSecret",
  // FRONTEND
  FRONTEND_URL: DEVELOPMENT
    ? "http://localhost:3000"
    : "https://<NOT_DEFINED>.com",
  // NODEMAILER
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASSWORD: process.env.NODEMAILER_PASSWORD,
};

console.log(">>> Info: the following consts are set:\n ", consts);

export default consts;
