import express from 'express';
import { authController } from 'controllers';
import login from './login';
import s3 from './s3';

const router = express.Router();

router.use(authController);

router.use('/login', login);
router.use('/s3', s3);

export default router;
