import express from 'express';
import {
  createController,
  deleteController,
  downloadController,
  getController,
  uploadController,
} from 'controllers/s3/object';

const router = express.Router();

router.get('/get', getController);
router.post('/create', createController);
router.post('/delete', deleteController);
router.post('/download', downloadController);
router.post('/upload', uploadController);

export default router;
