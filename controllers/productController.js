import Joi from 'joi';
import Product from "../models/product.js";

export function get(req, res) {
    Product.find()
        .limit(10)
        .sort({title: 1})
        .select({ title: 1, description: 1}) 
        .then(products => {
            res.json({
                'success': true,
                'data': products
            })
        })
        .catch(err => {
            res.status(500).json({
                'success': false,
                'message': 'Fucked up my friend, just leave this place :))'
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
                'success': true,
                'message': 'Your fucking product created successfully!'
            })
        })
        .catch(err => {
            res.status(500).json({
                success: true,
                message: 'Go fuck off my friend ;)) ' + err.message 
            })
        });
}

export function show(req, res) {
    Product.findById(req.params.id)
        .then(product => {
            res.json({
                success: true,
                data: product
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'fucked up :(('
            });
        })
}

export function update(req, res) {
    let body = req.body;

    Product.findByIdAndUpdate(req.params.id, {
        title: body.title,
        description: body.description
    }).then(() => {
        res.json({
            success: true,
            message: 'Your fucking product has been updated successfully!'
        });
    }).catch(() => {
        res.status(500).json({
            success: false,
            message: "You have been fucked up ;))"
        });
    });
}

export function destroy(req, res) {
    Product.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({
                success: true,
                message: "Done"
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: "Fuck"
            })
        });
}