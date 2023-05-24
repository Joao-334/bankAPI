"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const genToken = (id, secret) => {
    return (0, jsonwebtoken_1.sign)({ id }, secret, {
        expiresIn: '1d'
    });
};
exports.genToken = genToken;
