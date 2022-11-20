import express from 'express';
import { objectController } from 'controllers/s3';

const router = express.Router();

router.post('/get', objectController.get);
router.post('/create', objectController.create);
router.post('/delete', objectController.delete);
router.post('/download', objectController.download);
router.post('/paste', objectController.paste);
router.post('/upload', objectController.upload);

export default router;
