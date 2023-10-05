import express from 'express';
import AuthController from '../app/http/controllers/authController.js';
import validationMiddleware from '../app/http/middleware/validationMiddleware.js';
import registerRequest from '../app/http/requests/auth/registerRequest.js';
import loginRequest from '../app/http/requests/auth/loginRequest.js';

const router = express.Router();

router.post('/register', validationMiddleware(registerRequest), AuthController.register);
router.post('/login', validationMiddleware(loginRequest), AuthController.login);

export default router;