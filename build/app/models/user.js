"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
exports.User = (0, mongoose_1.model)('User', new mongoose_1.Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    accountId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    cards: {
        type: [
            {
                cardId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Card' },
            }
        ], required: true, _id: false
    }
}, { timestamps: true }));
