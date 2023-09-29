import express from 'express';
import { register, login } from '../app/http/controllers/authController.js';
import validationMiddleware from '../app/http/middleware/validationMiddleware.js';
import registerRequest from '../app/http/requests/auth/registerRequest.js';
import loginRequest from '../app/http/requests/auth/loginRequest.js';

const router = express.Router();

router.post('/register', validationMiddleware(registerRequest), register);
router.post('/login', validationMiddleware(loginRequest), login);

export default router;