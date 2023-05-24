"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transfer = void 0;
const mongoose_1 = require("mongoose");
exports.Transfer = (0, mongoose_1.model)('Transfer', new mongoose_1.Schema({
    accountId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Account' },
    from: { type: String, required: false },
    value: { type: Number, required: true },
    date: { type: Date, required: true }
}));
