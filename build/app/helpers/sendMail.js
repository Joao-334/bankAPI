"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = require("../../config/nodemailer");
const nodemailer_2 = require("../../config/nodemailer");
const getHtml = () => {
    return `
        <h1 style="color:blue;font-size:14px">Testando se o envio de email funciona!</h1>
    `;
};
const sendMail = (emailTo, subject, text) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: nodemailer_2.email,
        to: emailTo,
        subject,
        text: text,
        html: getHtml(),
    };
    yield nodemailer_1.transport.sendMail(mailOptions);
    return {
        message: 'Email sent successfully'
    };
});
exports.sendMail = sendMail;
