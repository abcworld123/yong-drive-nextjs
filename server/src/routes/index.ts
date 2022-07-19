import express from 'express';
import s3 from './s3';

const router = express.Router();

router.use('/s3', s3);

export default router;
