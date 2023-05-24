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
const account_1 = require("../models/account");
const transfer_1 = require("../models/transfer");
const createTransfer_1 = require("../helpers/createTransfer");
class accountController {
    static getAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = JSON.parse(req.headers['user']);
                const account = yield account_1.Account.findById(user.accountId);
                return res.status(200).json({
                    account
                });
            }
            catch (error) {
                return res.status(422).json({
                    msg: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
    static getUserTransfers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountId = JSON.parse(req.headers['user']).accountId;
                const account = yield account_1.Account.findById(accountId).sort({ transfers: 1 });
                return res.status(200).json({
                    transfers: account === null || account === void 0 ? void 0 : account.transfers
                });
            }
            catch (error) {
                return res.status(422).json({
                    msg: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
    static transfer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount } = req.body;
                const { to } = req.query;
                const userFrom = JSON.parse(req.headers['user']);
                const account = yield account_1.Account.findById(userFrom === null || userFrom === void 0 ? void 0 : userFrom.accountId);
                const accountTo = yield account_1.Account.findOne({ number: to });
                if (!account || !accountTo)
                    throw new Error('Account not found');
                if (amount > account.balance)
                    throw new Error('Your balance must be greater than amount to transfer');
                account.balance -= amount;
                const model = yield transfer_1.Transfer.create((0, createTransfer_1.createTransfer)(account._id, account.number, amount));
                yield transfer_1.Transfer.create((0, createTransfer_1.createTransfer)(accountTo._id, account.number, amount));
                const transfer = yield transfer_1.Transfer.findOne({ from: model.from });
                if (transfer) {
                    account.transfers.push({
                        transfer: transfer === null || transfer === void 0 ? void 0 : transfer._id,
                        typeOf: 'Transfer'
                    });
                }
                yield account.save();
                accountTo.balance += amount;
                accountTo.save();
                return res.status(200).json({
                    message: 'Transfer complete',
                    balance: account.balance
                });
            }
            catch (error) {
                return res.status(422).json({
                    msg: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
    static deposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { amount } = req.body;
                const account = yield account_1.Account.findById(JSON.parse(req.headers['user']).accountId);
                if (!account)
                    throw new Error('Account not found');
                account.balance += amount;
                const modal = yield transfer_1.Transfer.create((0, createTransfer_1.createTransfer)(account._id, account.number, amount));
                const transfer = yield transfer_1.Transfer.findOne({ from: modal.from });
                if (transfer) {
                    account.transfers.push({
                        transfer: transfer._id,
                        typeOf: 'Deposit'
                    });
                }
                account.save();
                return res.status(200).json({
                    message: 'Sucess Deposit',
                    balance: account.balance,
                    transfer: transfer
                });
            }
            catch (error) {
                return res.status(422).json({
                    msg: 'An error has ocurried',
                    errors: [{ error: error.message }]
                });
            }
        });
    }
}
exports.default = accountController;
