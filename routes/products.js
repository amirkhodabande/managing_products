import express from 'express';
import { get, store, show, update, destroy } from '../app/http/controllers/productController.js';

const router = express.Router();

// TODO: authentication for routes
router.get('', get);
router.post('', store);
router.get('/:id', show);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;