import express from 'express';
import ProductController from '../app/http/controllers/productController.js';
import validationMiddleware from '../app/http/middleware/validationMiddleware.js';
import productStoreRequest from '../app/http/requests/productStoreRequest.js';
import productUpdateRequest from '../app/http/requests/productUpdateRequest.js';

const router = express.Router();

router.get('', ProductController.get);
router.post('', validationMiddleware(productStoreRequest), ProductController.store);
router.get('/:id', ProductController.show);
router.put('/:id', validationMiddleware(productUpdateRequest), ProductController.update);
router.delete('/:id', ProductController.destroy);

export default router;