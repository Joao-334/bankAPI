import { User } from '../models/user';
import { config } from '../../config/config';
import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayLoad = {
    id: string;
    iat: number;
    expires: number;
}


export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    // Bearer token
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({
        errors: ['Negated Access']
    });

    try {
        const verified = verify(token, config.secret);
        const { id } = verified as TokenPayLoad;

        const user = await User.findById(id).select('-password');

        req.headers['user'] = JSON.stringify(user);
        next();
    }
    catch (error) {
        res.status(401).json({
            errors: ['Invalid Token']
        });
    }

};
