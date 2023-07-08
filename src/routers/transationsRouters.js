import dotenv from 'dotenv'
import { createTransaction, getTransaction, deleteTransaction, updateTransaction } from '../controllers/transationsController.js'
import { validateSchema } from '../middlewares/validateSchemaMiddlewares.js'
import { transactionSchema, transactionUpdateSchema } from '../schemas/validationTransaction.js'
import { validateAuthentication } from '../middlewares/authenticationMiddlewares.js'
import { Router } from 'express';

dotenv.config();

const transactionRouter = Router();
transactionRouter.use(validateAuthentication)

transactionRouter.post('/transactions', validateSchema(transactionSchema), createTransaction);
transactionRouter.get('/transactions', getTransaction);
transactionRouter.delete('/transactions/:id', deleteTransaction);
transactionRouter.put('/transactions/:type/:id', validateSchema(transactionUpdateSchema), updateTransaction);


export default transactionRouter;