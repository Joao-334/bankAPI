import { model, Schema } from 'mongoose';

export const Account = model('Account', new Schema({
    ownerId: { type: Schema.Types.ObjectId, required: false, ref: 'User'},
    number: { type: String, required: true },
    agency: { type: String, required: true },
    balance: { type: Number, required: true },
    transfers: {
        type: [
            {
                transfer: {
                    type: Schema.Types.ObjectId,
                    ref: 'Transfer',
                    _id: false
                },
                typeOf: { type: String, required: true, enum: ['Transfer', 'Deposit']}
            }
        ]
    }
}));
