import express from 'express';
import { authController } from 'controllers';

const router = express.Router();

router.get('/check', authController.check);
router.post('/login', authController.login);

export default router;
