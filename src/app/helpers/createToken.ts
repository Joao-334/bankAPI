import { sign } from 'jsonwebtoken';
import { Schema } from 'mongoose';

export const genToken = (id: Schema.Types.ObjectId, secret: string) => {
    return sign(
        { id }, secret,
        {
            expiresIn: '1d'
        }
    );
};
