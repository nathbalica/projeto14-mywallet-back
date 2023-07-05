import {Router} from 'express';
import authRouter from './authRouters.js'
import transationRouter from './transationsRouters.js'

const router = Router();

router.use(authRouter);
router.use(transationRouter);


export default router;