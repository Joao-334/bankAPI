"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = require("mongoose");
exports.Account = (0, mongoose_1.model)('Account', new mongoose_1.Schema({
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, required: false, ref: 'User' },
    number: { type: String, required: true },
    agency: { type: String, required: true },
    balance: { type: Number, required: true },
    transfers: {
        type: [
            {
                transfer: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'Transfer',
                    _id: false
                },
                typeOf: { type: String, required: true, enum: ['Transfer', 'Deposit'] }
            }
        ]
    }
}));
