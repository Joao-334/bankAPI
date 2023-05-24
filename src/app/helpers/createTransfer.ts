import { ObjectId } from 'mongoose';

export const createTransfer = (id: ObjectId, from: string, value: number) => {
    return {
        accountId: id,
        from: from,
        value: value,
        date: Date.now()
    };
};
