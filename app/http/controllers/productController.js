import Joi from 'joi';
import logger from '../../services/logger.js';
import Product from "../../models/product.js";

export function get(req, res) {
    Product.find()
        .limit(10)
        .sort({ title: 1 })
        .select({ title: 1, description: 1 })
        .then(products => {
            res.json({
                success: true,
                data: products
            })
        })
        .catch(err => {
            logger.error(err.message, { stack: err.stack });

            res.status(500).json({
                success: false,
                error: req.t('messages.failed'),
                data: []
            })
        });
}

export function store(req, res) {
    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .required(),
        description: Joi.string()
            .min(3)
            .required(),
    });

    let body = req.body;

    let validationCheck = schema.validate(body);

    if (validationCheck.error) {
        res.status(422).json(validationCheck.error);
    }

    let product = new Product({
        title: body.title,
        description: body.description
    });

    product.save()
        .then(() => {
            res.status(201).json({
                success: true,
                message: req.t('messages.success'),
            })
        })
        .catch(err => {
            logger.error(err.message, { stack: err.stack });

            res.status(500).json({
                success: false,
                error: req.t('messages.failed'),
            })
        });
}

export function show(req, res) {
    Product.findById(req.params.id)
        .then(product => {
            res.json({
                success: true,
                message: req.t('messages.success'),
                data: product
            });
        })
        .catch(err => {
            logger.error(err.message, { stack: err.stack });

            res.status(500).json({
                success: false,
                error: req.t('messages.failed'),
            });
        })
}

export function update(req, res) {
    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .required(),
        description: Joi.string()
            .min(3)
            .required(),
    });

    let body = req.body;

    let validationCheck = schema.validate(body);

    if (validationCheck.error) {
        res.status(422).json(validationCheck.error);
    }

    Product.findByIdAndUpdate(req.params.id, {
        title: body.title,
        description: body.description
    }).then(() => {
        res.json({
            success: true,
            message: req.t('messages.success'),
        });
    }).catch(() => {
        logger.error(err.message, { stack: err.stack });

        res.status(500).json({
            success: false,
            error: req.t('messages.failed'),
        });
    });
}

export function destroy(req, res) {
    Product.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({
                success: true,
                message: req.t('messages.success'),
            });
        })
        .catch(err => {
            logger.error(err.message, { stack: err.stack });

            res.json({
                success: false,
                error: req.t('messages.failed'),
            })
        });
}