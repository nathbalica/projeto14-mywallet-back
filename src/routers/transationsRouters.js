import dotenv from 'dotenv'
import { createTransaction } from '../controllers/transationsController.js'
import { validateSchema } from '../middlewares/validateSchemaMiddlewares.js'
import { transactionSchema } from '../schemas/validationTransaction.js'
import { validateAuthentication } from '../middlewares/authenticationMiddlewares.js'
import { Router } from 'express';

dotenv.config();

const transactionRouter = Router();
transactionRouter.use(validateAuthentication)

transactionRouter.post('/transactions', validateSchema(transactionSchema), createTransaction)

export default transactionRouter;