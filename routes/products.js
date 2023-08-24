import express from 'express';
import { get, store, show, update, destroy } from '../controllers/productController.js';

const router = express.Router();

router.get('', get);
router.post('', store);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;