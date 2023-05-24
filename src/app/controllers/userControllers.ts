/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { User } from '../models/user';
import { genToken } from '../helpers/createToken';
import { genSalt, hash, compare } from 'bcryptjs';
import { generateAccount } from '../helpers/generateAccount';
import { config } from '../../config/config';
import { ObjectId } from 'mongoose';
import { Account } from '../models/account';
// import { sendMail } from '../helpers/sendMail';

export default class userController {
    static async create(req: Request, res: Response) {
        try {

            const { name, email, password, cpf } = req.body;

            const verify = await User.findOne({ email: email }) || await User.findOne({ cpf: cpf });

            if (verify) throw new Error('User with this email or cpf already exists');

            const salt = await genSalt(15);
            const hashedPassword = await hash(password, salt);

            const model = await generateAccount();

            await Account.create({
                ownerId: undefined,
                ...model,
            });

            const account = await Account.findOne({ number: model.number });

            const modelUser = {
                name,
                cpf,
                email,
                password: hashedPassword,
                accountId: account?._id,
                cards: [],
            };

            const user = await User.create(modelUser);

            //await sendMail(user.email, 'Your account confirmation', 'click on the link below to confirm your account');

            return res.status(201).json({ token: genToken(user?._id as unknown as ObjectId, config.secret) });
        }

        catch (error: any) {
            return res.status(422).json({
                message: 'An error has ocurried',
                errors: [{ error: error.message }]
            });
        }
    }

    static async confirmUser(req: Request, res: Response) {

        try {
            const { user } = req.body;

            await User.create(user);

            const confirmedUser = await User.findOne({ email: user.email });

            await Account.findByIdAndUpdate(confirmedUser?.accountId, { ownerId: confirmedUser?._id });

            return res.status(200).json({
                message: 'User successfully confirmed',
                token: genToken(confirmedUser?._id as unknown as ObjectId, config.secret)
            });
        } catch (error: any) {
            return res.status(422).json({
                message: 'An error has ocurried',
                errors: [{ error: error.message }]
            });
        }

    }

    static async login(req: Request, res: Response) {

        try {

            const { email, password } = req.body;

            const user = await User.findOne({ email: email });

            if (!user) throw new Error('User not exists or not verified');

            const passMatch = await compare(password, user.password);

            if (!passMatch) throw new Error('Informed Password dont match');

            return res.status(200).json({
                token: genToken(user._id as unknown as ObjectId, config.secret)
            });

        } catch (error: any) {
            return res.status(422).json({
                message: 'An error has ocurried',
                errors: [{ error: error.message }]
            });
        }
    }

    static async getUserLogged(req: Request, res: Response) {

        try {

            const stringUser = req.headers['user'];

            const user = JSON.parse(stringUser as string);

            res.status(200).json({
                user
            });
        }

        catch (error: any) {
            return res.status(422).json({
                message: 'An error has ocurried',
                errors: [{ error: error.message }]
            });
        }

    }

    static async updateUser(req: Request, res: Response) {

        try {
            const { name, password, email } = req.body;
            const id = JSON.parse(req.headers['user'] as string)._id;

            const user = await User.findById(id);

            if (!user) throw new Error('Invalid token or user');

            let profileImage = null;

            if (req.file) {
                profileImage = req.file.filename;
            }

            if (name) user.name = name;
            if (password) {
                const salt = await genSalt(15);
                const hashedPassword = await hash(password, salt);

                user.password = hashedPassword;
            }
            if (email) user.email = email;
            if (profileImage) user.profileImage = profileImage;

            // await sendMail(emailUser, 'Update Your Account', 'Click on the link below to update your account');

            user.save();

            return res.status(200).json({
                user
            });

        } catch (error: any) {
            return res.status(422).json({
                message: 'An error has ocurried',
                errors: [{ error: error.message }]
            });
        }

    }

    static async confirmUpdate(req: Request, res: Response) {

        try {
            const { name, email, password, profileImage } = req.body;
            const id = JSON.parse(req.headers['user'] as string)._id;

            const user = await User.findById(id);

            if (!user) throw new Error('User not found');

            if (name != '') user.name = name;
            if (email != '') user.email = email;
            if (password != '') user.password = password;
            if (profileImage != '') user.profileImage = profileImage;

            user.save();

            return res.status(202).json({
                message: 'Update successfully'
            });
        } catch (error: any) {
            return res.status(422).json({
                message: 'An error has ocurried',
                errors: [{ error: error.message }]
            });
        }
    }
}
