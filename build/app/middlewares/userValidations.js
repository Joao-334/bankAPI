"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const express_validator_1 = require("express-validator");
const userValidations = () => {
    return [
        (0, express_validator_1.body)('userName').isString().withMessage('Name need be a string!').isLength({ min: 3 }).withMessage('Name need more 3 characters'),
        (0, express_validator_1.body)('userEmail').isString().withMessage('Email need be a string!').isEmail().withMessage('Informed email is not valid!'),
        (0, express_validator_1.body)('userPass').isString().withMessage('Password need be a string!').isStrongPassword().withMessage('Informed pass is not Strong!').custom((value, { req }) => {
            if (value !== req.body.confirmPass)
                throw new Error('ConfirmPass dont Match with Informed Pass');
            return true;
        }),
    ];
};
exports.userValidations = userValidations;
