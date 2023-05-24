import { model, Schema } from 'mongoose';

export const Card = model('Card', new Schema({
    ownerId: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    number: { type: String, required: true },
    cvc: { type: String, required: true },
    valid: { type: String, required: true },
    typeOf: { type: String, required: true, enum: ['Credit', 'Debit']}
}));
