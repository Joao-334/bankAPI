"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransfer = void 0;
const createTransfer = (id, from, value) => {
    return {
        accountId: id,
        from: from,
        value: value,
        date: Date.now()
    };
};
exports.createTransfer = createTransfer;
