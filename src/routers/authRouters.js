import dotenv from 'dotenv'
import { signUp, signIn, logout } from '../controllers/authController.js'
import { validateSchema } from '../middlewares/validateSchemaMiddlewares.js'
import { validateAuthentication } from '../middlewares/authenticationMiddlewares.js'
import { registrationSchema, loginSchema } from '../schemas/validationsAuth.js'
import { Router } from 'express';

dotenv.config();

const authRouter = Router();

authRouter.post('/sign-up', validateSchema(registrationSchema), signUp);
authRouter.post('/login', validateSchema(loginSchema), signIn);
authRouter.post('/logout', validateAuthentication, logout)

export default authRouter;






