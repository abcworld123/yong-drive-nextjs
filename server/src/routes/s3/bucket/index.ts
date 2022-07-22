import express from 'express';
import { getController } from 'controllers/s3/bucket';

const router = express.Router();

router.get('/get', getController);

export default router;
