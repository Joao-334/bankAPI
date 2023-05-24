import { model, Schema } from 'mongoose';

export const User = model('User', new Schema({
    name: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    accountId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    cards: {
        type: [
            {
                cardId: {type: Schema.Types.ObjectId, required: true, ref: 'Card'},
            }
        ], required: true, _id: false
    }
},
{ timestamps: true }));
