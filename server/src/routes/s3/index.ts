import express from 'express';
import bucket from './bucket';
import object from './object';

const router = express.Router();

router.use('/bucket', bucket);
router.use('/object', object);

export default router;
