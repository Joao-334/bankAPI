/* eslint-disable @typescript-eslint/no-explicit-any */
import { genCard } from '../helpers/genCard';
import { Card } from '../models/card';
import { Request, Response } from 'express';
import { User } from '../models/user';
import { ObjectId } from 'mongoose';

export default class cardControllers {
    static async createCard(req: Request, res: Response) {

        try {

            const { type } = req.body;

            const id = JSON.parse(req.headers['user'] as string)._id;

            const user = await User.findById(id);

            if (!user) throw new Error('User dont exist');

            if (user.cards.length === 2) throw new Error('the limit number of cards has been reached');

            const model = await genCard(type, user._id as unknown as ObjectId);

            const card = await Card.create(model);

            user.cards.push({
                cardId: card._id
            });

            user.save();

            return res.status(200).json({
                message: 'Card has been created',
                card: card,
                cards: user.cards
            });


        } catch (error: any) {
            return res.status(422).json({
                message: 'An error has ocurried',
                errors: [{error: error.message}]
            });
        }

    }

    static async getCard(req: Request, res: Response) {
        const { cardId } = req.params;

        const card = await Card.findById(cardId);

        return res.status(200).json({
            card
        });
    }

    static async getAllUserCards(req: Request, res: Response) {
        const user = JSON.parse(req.headers['user'] as string);

        return res.status(200).json({
            cards: user.cards
        });
    }

    static async deleteCard(req: Request, res: Response) {

        try {
            const { cardId } = req.params;

            const user = JSON.parse(req.headers['user'] as string);

            if (!user && user.cards.length < 0) throw new Error('User does not exist or has no cards');

            await Card.findByIdAndDelete(cardId);

            return res.status(200).json({
                message: 'Card deleted successfully',
                cards: user.cards
            });
        } catch (error: any) {
            return res.status(422).json({
                message: 'An error has ocurried',
                errors: [{error: error.message}]
            });
        }

    }
}
