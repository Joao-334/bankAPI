"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;
const emailUser = String(process.env.EMAIL_USER);
const emailPassword = String(process.env.EMAIL_PASS);
exports.config = {
    port: port,
    dbURI: `mongodb+srv://${dbUser}:${dbPass}@cluster0.1t92y6c.mongodb.net/?retryWrites=true&w=majority`,
    secret: String(jwtSecret),
    emailUser,
    emailPassword
};
