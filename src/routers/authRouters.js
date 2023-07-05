import dotenv from 'dotenv'
import { signUp } from '../controllers/authController.js'
import { validateUser } from '../middlewares/authMiddlewares.js'
import { Router } from 'express';

dotenv.config();

const authRouter = Router();

authRouter.post('/cadastro', validateUser, signUp)

export default authRouter;






