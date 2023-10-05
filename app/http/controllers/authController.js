import logger from '../../services/logger.js';
import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    let { first_name, last_name, email, password } = req.body;

    const oldUser = await User.findOne({ email });

    if (oldUser) {
        return res.json({
            success: false,
            error: req.t('messages.user-exists'),
            data: []
        }, 409)
    }

    const session = await User.startSession();
    session.startTransaction();

    try {
        const user = User.create({
            first_name,
            last_name,
            email: email,
            password: await bcrypt.hash(password, 10)
        }, { session: session });

        const token = jwt.sign(
            { user_id: (await user)._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        );
        console.log('out');

        await session.commitTransaction();
        session.endSession();

        return res.json({
            success: true,
            error: req.t('messages.success'),
            data: {
                token: token
            }
        }, 201)
    } catch (err) {
        logger.error(err.message, { stack: err.stack });

        await session.abortTransaction();
        session.endSession();

        res.json({
            success: false,
            error: req.t('messages.500'),
            data: []
        }, 500)
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user && !(await bcrypt.compare(password, user.password))) {
            return res.json({
                success: false,
                error: req.t('messages.400'),
                data: []
            }, 400)
        }

        const token = jwt.sign(
            { user_id: (await user)._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        );

        return res.json({
            success: false,
            error: req.t('messages.400'),
            data: {
                token: token
            }
        }, 400)
    } catch (err) {
        logger.error(err.message, { stack: err.stack });

        res.json({
            success: false,
            error: req.t('messages.500'),
            data: []
        }, 500)
    }
}