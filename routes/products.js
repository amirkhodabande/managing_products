import express from 'express';
import { get, store, show, update, destroy } from '../app/http/controllers/productController.js';
import validationMiddleware from '../app/http/middleware/validationMiddleware.js';
import productStoreRequest from '../app/http/requests/productStoreRequest.js';
import productUpdateRequest from '../app/http/requests/productUpdateRequest.js';

const router = express.Router();

router.get('', get);
router.post('', validationMiddleware(productStoreRequest), store);
router.get('/:id', show);
router.put('/:id', validationMiddleware(productUpdateRequest), update);
router.delete('/:id', destroy);

export default router;