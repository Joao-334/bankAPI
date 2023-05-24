/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Account } from '../models/account';
import { Transfer } from '../models/transfer';
import { createTransfer } from '../helpers/createTransfer';
import { ObjectId } from 'mongoose';

export default class accountController {

    static async getAccount(req: Request, res: Response) {

        try {
            const user = JSON.parse(req.headers['user'] as string);

            const account = await Account.findById(user.accountId);

            return res.status(200).json({
                account
            });
        } catch (error: any) {
            return res.status(422).json({
                msg: 'An error has ocurried',
                errors: [{error: error.message}]
            });
        }


    }

    static async getUserTransfers(req: Request, res: Response) {

        try {
            const accountId = JSON.parse(req.headers['user'] as string).accountId;

            const account = await Account.findById(accountId).sort({transfers: 1});

            return res.status(200).json({
                transfers: account?.transfers
            });
        } catch (error: any) {
            return res.status(422).json({
                msg: 'An error has ocurried',
                errors: [{error: error.message}]
            });
        }

    }

    static async transfer(req: Request, res: Response) {
        try {
            const { amount } = req.body;
            const { to } = req.query;

            const userFrom = JSON.parse(req.headers['user'] as string);

            const account = await Account.findById(userFrom?.accountId);
            const accountTo = await Account.findOne({ number: to });

            if (!account || !accountTo) throw new Error('Account not found');

            if (amount > account.balance) throw new Error('Your balance must be greater than amount to transfer');

            account.balance -= amount;

            const model = await Transfer.create(createTransfer(account._id as unknown as ObjectId, account.number, amount));
            await Transfer.create(createTransfer(accountTo._id as unknown as ObjectId, account.number, amount));

            const transfer = await Transfer.findOne({ from: model.from });

            if (transfer) {
                account.transfers.push({
                    transfer: transfer?._id,
                    typeOf: 'Transfer'
                });
            }

            await account.save();

            accountTo.balance += amount;

            accountTo.save();

            return res.status(200).json({
                message: 'Transfer complete',
                balance: account.balance
            });


        } catch (error: any) {
            return res.status(422).json({
                msg: 'An error has ocurried',
                errors: [{error: error.message}]
            });
        }

    }

    static async deposit(req: Request, res: Response) {

        try {
            const { amount } = req.body;

            const account = await Account.findById(JSON.parse(req.headers['user'] as string).accountId);

            if (!account) throw new Error('Account not found');

            account.balance += amount;

            const modal = await Transfer.create(createTransfer(account._id as unknown as ObjectId, account.number, amount));
            const transfer = await Transfer.findOne({ from: modal.from });

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

        } catch (error: any) {
            return res.status(422).json({
                msg: 'An error has ocurried',
                errors: [{error: error.message}]
            });
        }
    }
}
