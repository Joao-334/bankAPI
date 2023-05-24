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
const user_1 = require("../models/user");
const createToken_1 = require("../helpers/createToken");
const bcryptjs_1 = require("bcryptjs");
const generateAccount_1 = require("../helpers/generateAccount");
const config_1 = require("../../config/config");
const account_1 = require("../models/account");
// import { sendMail } from '../helpers/sendMail';
class userController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, cpf } = req.body;
                const verify = (yield user_1.User.findOne({ email: email })) || (yield user_1.User.findOne({ cpf: cpf }));
                if (verify)
                    throw new Error('User with this email or cpf already exists');
                const salt = yield (0, bcryptjs_1.genSalt)(15);
                const hashedPassword = yield (0, bcryptjs_1.hash)(password, salt);
                const model = yield (0, generateAccount_1.generateAccount)();
                yield account_1.Account.create(Object.assign({ ownerId: undefined }, model));
                const account = yield account_1.Account.findOne({ number: model.number });
                const modelUser = {
                    name,
                    cpf,
                    email,
                    password: hashedPassword,
                    accountId: account === null || account === void 0 ? void 0 : account._id,
                    cards: [],
                };
                const user = yield user_1.User.create(modelUser);
                //await sendMail(user.email, 'Your account confirmation', 'click on the link below to confirm your account');
                return res.status(201).json({ token: (0, createToken_1.genToken)(user === null || user === void 0 ? void 0 : user._id, config_1.config.secret) });
            }
            catch (error) {
                return res.status(422).json({
                    message: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
    static confirmUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user } = req.body;
                yield user_1.User.create(user);
                const confirmedUser = yield user_1.User.findOne({ email: user.email });
                yield account_1.Account.findByIdAndUpdate(confirmedUser === null || confirmedUser === void 0 ? void 0 : confirmedUser.accountId, { ownerId: confirmedUser === null || confirmedUser === void 0 ? void 0 : confirmedUser._id });
                return res.status(200).json({
                    message: 'User successfully confirmed',
                    token: (0, createToken_1.genToken)(confirmedUser === null || confirmedUser === void 0 ? void 0 : confirmedUser._id, config_1.config.secret)
                });
            }
            catch (error) {
                return res.status(422).json({
                    message: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield user_1.User.findOne({ email: email });
                if (!user)
                    throw new Error('User not exists or not verified');
                const passMatch = yield (0, bcryptjs_1.compare)(password, user.password);
                if (!passMatch)
                    throw new Error('Informed Password dont match');
                return res.status(200).json({
                    token: (0, createToken_1.genToken)(user._id, config_1.config.secret)
                });
            }
            catch (error) {
                return res.status(422).json({
                    message: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
    static getUserLogged(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stringUser = req.headers['user'];
                const user = JSON.parse(stringUser);
                res.status(200).json({
                    user
                });
            }
            catch (error) {
                return res.status(422).json({
                    message: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, password, email } = req.body;
                const id = JSON.parse(req.headers['user'])._id;
                const user = yield user_1.User.findById(id);
                if (!user)
                    throw new Error('Invalid token or user');
                let profileImage = null;
                if (req.file) {
                    profileImage = req.file.filename;
                }
                if (name)
                    user.name = name;
                if (password) {
                    const salt = yield (0, bcryptjs_1.genSalt)(15);
                    const hashedPassword = yield (0, bcryptjs_1.hash)(password, salt);
                    user.password = hashedPassword;
                }
                if (email)
                    user.email = email;
                if (profileImage)
                    user.profileImage = profileImage;
                // await sendMail(emailUser, 'Update Your Account', 'Click on the link below to update your account');
                user.save();
                return res.status(200).json({
                    user
                });
            }
            catch (error) {
                return res.status(422).json({
                    message: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
    static confirmUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, profileImage } = req.body;
                const id = JSON.parse(req.headers['user'])._id;
                const user = yield user_1.User.findById(id);
                if (!user)
                    throw new Error('User not found');
                if (name != '')
                    user.name = name;
                if (email != '')
                    user.email = email;
                if (password != '')
                    user.password = password;
                if (profileImage != '')
                    user.profileImage = profileImage;
                user.save();
                return res.status(202).json({
                    message: 'Update successfully'
                });
            }
            catch (error) {
                return res.status(422).json({
                    message: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
}
exports.default = userController;
