import express from 'express';
import { bucketController } from 'controllers/s3';

const router = express.Router();

router.get('/get', bucketController.get);

export default router;
