"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.email = exports.transport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("./config");
exports.transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: config_1.config.emailUser,
        pass: config_1.config.emailPassword
    }
});
exports.email = config_1.config.emailUser;
