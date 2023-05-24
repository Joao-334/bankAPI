import { model, Schema } from 'mongoose';

export const Transfer = model('Transfer', new Schema({
    accountId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'},
    from: { type: String, required: false },
    value: { type: Number, required: true },
    date: { type: Date, required: true }
}));
