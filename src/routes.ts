import Router, { Request, Response } from 'express';
import { validate } from './app/middlewares/handleValidations';
import { createValidations, loginValidations, updateValidations, transferValidation, moneyValidation, cardTypeValidation } from './app/middlewares/validations';
import userController from './app/controllers/userControllers';
import { authGuard } from './app/middlewares/authGuard';
import { imageUpload } from './app/middlewares/multer';
import accountController from './app/controllers/accountController';
import cardControllers from './app/controllers/cardController';

const router = Router();

// User Routes
router.get('/', (req: Request, res: Response) => { return res.json('Ok!'); });
router.get('/getUser', authGuard, userController.getUserLogged);
router.post('/register', createValidations(), validate ,userController.create);
// router.post('/confirmUser', userController.confirmUser);
router.post('/login', loginValidations(), validate ,userController.login);
router.post('/update', authGuard , updateValidations(), validate, imageUpload.single('profileImage') ,userController.updateUser);
//router.put('/confirmUpdate/:id', authGuard , userController.confirmUpdate);

/* Todas as rotas de Usuário estão OK! */

// Account Routes
router.get('/account', authGuard , accountController.getAccount);
router.get('/account/transfers', authGuard , accountController.getUserTransfers);
router.post('/account/transfer', authGuard, moneyValidation(), transferValidation(), validate, accountController.transfer);
router.post('/account/deposit', authGuard, moneyValidation(), validate ,accountController.deposit);

/* Rotas de Conta estão Ok */

// Card Routes
router.post('/card', authGuard, cardTypeValidation(), validate, cardControllers.createCard);
router.get('/card/:id', authGuard, cardControllers.getCard);
router.get('/user/card/', authGuard, cardControllers.getAllUserCards);
router.delete('/card/delete/:id', authGuard, cardControllers.deleteCard);

// OK!

export default router;
