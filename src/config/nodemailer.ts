import nodemailer from 'nodemailer';
import { config } from './config';

export const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.emailUser,
        pass: config.emailPassword
    }
});

export const email = config.emailUser;
