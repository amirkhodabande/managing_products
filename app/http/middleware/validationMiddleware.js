export default (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (!error) {
        return next();
    }

    res.status(422)
        .json(error.details[0].message);
};