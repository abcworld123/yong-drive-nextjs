import express from 'express';
import { bucketController } from 'controllers/s3';

const router = express.Router();

router.post('/get', bucketController.get);

export default router;
