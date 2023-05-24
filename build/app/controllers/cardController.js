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
/* eslint-disable @typescript-eslint/no-explicit-any */
const genCard_1 = require("../helpers/genCard");
const card_1 = require("../models/card");
const user_1 = require("../models/user");
class cardControllers {
    static createCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { type } = req.body;
                const id = JSON.parse(req.headers['user'])._id;
                const user = yield user_1.User.findById(id);
                if (!user)
                    throw new Error('User dont exist');
                if (user.cards.length === 2)
                    throw new Error('the limit number of cards has been reached');
                const model = yield (0, genCard_1.genCard)(type, user._id);
                const card = yield card_1.Card.create(model);
                user.cards.push({
                    cardId: card._id
                });
                user.save();
                return res.status(200).json({
                    message: 'Card has been created',
                    card: card,
                    cards: user.cards
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
    static getCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cardId } = req.params;
            const card = yield card_1.Card.findById(cardId);
            return res.status(200).json({
                card
            });
        });
    }
    static getAllUserCards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = JSON.parse(req.headers['user']);
            return res.status(200).json({
                cards: user.cards
            });
        });
    }
    static deleteCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cardId } = req.params;
                const user = JSON.parse(req.headers['user']);
                if (!user && user.cards.length < 0)
                    throw new Error('User does not exist or has no cards');
                yield card_1.Card.findByIdAndDelete(cardId);
                return res.status(200).json({
                    message: 'Card deleted successfully',
                    cards: user.cards
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
exports.default = cardControllers;
