import { body, query } from 'express-validator';
import { cpf } from 'cpf-cnpj-validator';

export const createValidations = () => {
    return [
        body('name').isString().withMessage('Name need be a string and not empty!').isLength({ min: 3 }).withMessage('Name need more 3 characters'),
        body('email').isString().withMessage('Email need be a string and not empty!').isEmail().withMessage('Informed email is not valid!'),
        body('password').isString().withMessage('Password need be a string and not empty!').isLength({min: 8, max: 16}).withMessage('Password too short').custom((value, { req }) => {
            if (value !== req.body.confirmPass) throw new Error('ConfirmPass dont Match with Informed Pass');

            return true;
        }),
        body('cpf').isString().withMessage('CPF need be a string!').custom((value, { req }) => {
            if (!cpf.isValid(req.body.cpf)) {
                throw new Error('Informed Cpf is not a valid');

            }

            return true;
        })
    ];
};

export const loginValidations = () => {
    return [
        body('email').isString().withMessage('Email need be a string!').isEmail().withMessage('Email is not valid!'),
        body('password').isString().withMessage('Password is needed!')
    ];
};

export const updateValidations = () => {

    return [
        body('name').optional().isLength({ min: 3 }).withMessage('Name must be more than 3 characters '),
        body('password').optional().isString().withMessage('Password need be a string and not empty!').isStrongPassword().withMessage('Informed pass is not Strong!').custom((value, { req }) => {
            if (value !== req.body.confirmPass) throw new Error('ConfirmPass dont Match with Informed Pass');

            return true;
        }),
        body('email').optional().isString().withMessage('Email need be a string and not empty!').isEmail().withMessage('Informed email is not valid!')
    ];

};


export const moneyValidation = () => {
    return [
        body('amount').isNumeric().withMessage('Amount must be a number'),
    ];
};

export const transferValidation = () => { return [ query('to').isString().withMessage('To need to be a string').isLength({ min: 8, max: 8 }).withMessage('Need have 8 characters')]; };

export const cardTypeValidation = () => { return [body('type').isString().withMessage('Type need be a string').custom((value) => {
    if (!['Credit','Debit'].includes(value)) throw new Error('Type must be Credit or Debit');
})];};
