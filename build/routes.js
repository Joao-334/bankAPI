"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleValidations_1 = require("./app/middlewares/handleValidations");
const validations_1 = require("./app/middlewares/validations");
const userControllers_1 = __importDefault(require("./app/controllers/userControllers"));
const authGuard_1 = require("./app/middlewares/authGuard");
const multer_1 = require("./app/middlewares/multer");
const accountController_1 = __importDefault(require("./app/controllers/accountController"));
const cardController_1 = __importDefault(require("./app/controllers/cardController"));
const router = (0, express_1.default)();
// User Routes
router.get('/', (req, res) => { return res.json('Ok!'); });
router.get('/getUser', authGuard_1.authGuard, userControllers_1.default.getUserLogged);
router.post('/register', (0, validations_1.createValidations)(), handleValidations_1.validate, userControllers_1.default.create);
// router.post('/confirmUser', userController.confirmUser);
router.post('/login', (0, validations_1.loginValidations)(), handleValidations_1.validate, userControllers_1.default.login);
router.post('/update', authGuard_1.authGuard, (0, validations_1.updateValidations)(), handleValidations_1.validate, multer_1.imageUpload.single('profileImage'), userControllers_1.default.updateUser);
//router.put('/confirmUpdate/:id', authGuard , userController.confirmUpdate);
/* Todas as rotas de Usuário estão OK! */
// Account Routes
router.get('/account', authGuard_1.authGuard, accountController_1.default.getAccount);
router.get('/account/transfers', authGuard_1.authGuard, accountController_1.default.getUserTransfers);
router.post('/account/transfer', authGuard_1.authGuard, (0, validations_1.moneyValidation)(), (0, validations_1.transferValidation)(), handleValidations_1.validate, accountController_1.default.transfer);
router.post('/account/deposit', authGuard_1.authGuard, (0, validations_1.moneyValidation)(), handleValidations_1.validate, accountController_1.default.deposit);
/* Rotas de Conta estão Ok */
// Card Routes
router.post('/card', authGuard_1.authGuard, (0, validations_1.cardTypeValidation)(), handleValidations_1.validate, cardController_1.default.createCard);
router.get('/card/:id', authGuard_1.authGuard, cardController_1.default.getCard);
router.get('/user/card/', authGuard_1.authGuard, cardController_1.default.getAllUserCards);
router.delete('/card/delete/:id', authGuard_1.authGuard, cardController_1.default.deleteCard);
// OK!
exports.default = router;
