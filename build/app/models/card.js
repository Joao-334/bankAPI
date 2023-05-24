"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const mongoose_1 = require("mongoose");
exports.Card = (0, mongoose_1.model)('Card', new mongoose_1.Schema({
    ownerId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    number: { type: String, required: true },
    cvc: { type: String, required: true },
    valid: { type: String, required: true },
    typeOf: { type: String, required: true, enum: ['Credit', 'Debit'] }
}));
