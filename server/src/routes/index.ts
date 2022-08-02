import express from 'express';
import { authController } from 'controllers';
import s3 from './s3';

const router = express.Router();

router.use(authController.auth);

router.get('/check', authController.check);
router.post('/login', authController.login);

router.use('/s3', s3);

export default router;
