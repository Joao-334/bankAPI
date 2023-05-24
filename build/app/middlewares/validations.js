"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardTypeValidation = exports.transferValidation = exports.moneyValidation = exports.updateValidations = exports.loginValidations = exports.createValidations = void 0;
const express_validator_1 = require("express-validator");
const cpf_cnpj_validator_1 = require("cpf-cnpj-validator");
const createValidations = () => {
    return [
        (0, express_validator_1.body)('name').isString().withMessage('Name need be a string and not empty!').isLength({ min: 3 }).withMessage('Name need more 3 characters'),
        (0, express_validator_1.body)('email').isString().withMessage('Email need be a string and not empty!').isEmail().withMessage('Informed email is not valid!'),
        (0, express_validator_1.body)('password').isString().withMessage('Password need be a string and not empty!').isLength({ min: 8, max: 16 }).withMessage('Password too short').custom((value, { req }) => {
            if (value !== req.body.confirmPass)
                throw new Error('ConfirmPass dont Match with Informed Pass');
            return true;
        }),
        (0, express_validator_1.body)('cpf').isString().withMessage('CPF need be a string!').custom((value, { req }) => {
            if (!cpf_cnpj_validator_1.cpf.isValid(req.body.cpf)) {
                throw new Error('Informed Cpf is not a valid');
            }
            return true;
        })
    ];
};
exports.createValidations = createValidations;
const loginValidations = () => {
    return [
        (0, express_validator_1.body)('email').isString().withMessage('Email need be a string!').isEmail().withMessage('Email is not valid!'),
        (0, express_validator_1.body)('password').isString().withMessage('Password is needed!')
    ];
};
exports.loginValidations = loginValidations;
const updateValidations = () => {
    return [
        (0, express_validator_1.body)('name').optional().isLength({ min: 3 }).withMessage('Name must be more than 3 characters '),
        (0, express_validator_1.body)('password').optional().isString().withMessage('Password need be a string and not empty!').isStrongPassword().withMessage('Informed pass is not Strong!').custom((value, { req }) => {
            if (value !== req.body.confirmPass)
                throw new Error('ConfirmPass dont Match with Informed Pass');
            return true;
        }),
        (0, express_validator_1.body)('email').optional().isString().withMessage('Email need be a string and not empty!').isEmail().withMessage('Informed email is not valid!')
    ];
};
exports.updateValidations = updateValidations;
const moneyValidation = () => {
    return [
        (0, express_validator_1.body)('amount').isNumeric().withMessage('Amount must be a number'),
    ];
};
exports.moneyValidation = moneyValidation;
const transferValidation = () => { return [(0, express_validator_1.query)('to').isString().withMessage('To need to be a string').isLength({ min: 8, max: 8 }).withMessage('Need have 8 characters')]; };
exports.transferValidation = transferValidation;
const cardTypeValidation = () => {
    return [(0, express_validator_1.body)('type').isString().withMessage('Type need be a string').custom((value) => {
            if (!['Credit', 'Debit'].includes(value))
                throw new Error('Type must be Credit or Debit');
        })];
};
exports.cardTypeValidation = cardTypeValidation;
