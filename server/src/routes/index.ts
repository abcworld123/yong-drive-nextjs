import express from 'express';
import { authController } from 'controllers';
import auth from './auth';
import s3 from './s3';

const router = express.Router();

router.use(authController.auth);

router.use('/auth', auth);
router.use('/s3', s3);

export default router;
