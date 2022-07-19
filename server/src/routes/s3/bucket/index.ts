import { getController } from 'controllers/s3/bucket';
import express from 'express';

const router = express.Router();

router.get('/get', getController);

export default router;
