import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    try {
        let { first_name, last_name, email, password } = req.body;

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.json({
                success: false,
                error: req.t('messages.user-exists'),
                data: []
            }, 409)
        }

        const user = User.create({
            first_name,
            last_name,
            email: email,
            password: await bcrypt.hash(password, 10)
        });

        user.token = jwt.sign(
            { user_id: (await user)._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            success: true,
            error: req.t('messages.success'),
            data: []
        }, 201)
    } catch (error) {
        // TODO: db transactions
        res.json({
            success: false,
            error: req.t('messages.500'),
            data: []
        }, 500)
    }
}

export function login(req, res) {
    let body = req.body;
    res.end('a');
}