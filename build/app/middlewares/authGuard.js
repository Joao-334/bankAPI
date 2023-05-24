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
exports.authGuard = void 0;
const user_1 = require("../models/user");
const config_1 = require("../../config/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const authGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    // Bearer token
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({
            errors: ['Negated Access']
        });
    try {
        const verified = (0, jsonwebtoken_1.verify)(token, config_1.config.secret);
        const { id } = verified;
        const user = yield user_1.User.findById(id).select('-password');
        req.headers['user'] = JSON.stringify(user);
        next();
    }
    catch (error) {
        res.status(401).json({
            errors: ['Invalid Token']
        });
    }
});
exports.authGuard = authGuard;
