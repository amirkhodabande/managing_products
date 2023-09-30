import jwt from "jsonwebtoken";

const config = process.env;

export default (req, res, next) => {
    const token = req.headers["authorization"];
    console.log(req.headers);
    if (!token) {
        return res.status(403).json({
            success: false,
            error: req.t('messages.403'),
            data: []
        });
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: req.t('messages.401'),
            data: []
        });
    }

    return next();
};