import Product from "../../models/product.js";

class ProductController {
    async get(req, res) {
        let products = await Product.find()
            .limit(10)
            .sort({ title: 1 })
            .select({ title: 1, description: 1 });

        res.json({
            success: true,
            data: products
        });
    }

    async store(req, res) {
        let body = req.body;

        await Product.create({
            title: body.title,
            description: body.description
        });

        res.status(201).json({
            success: true,
            message: req.t('messages.success'),
        });
    }

    async show(req, res) {
        console.log(req.params.id);

        let product = await Product.findById(req.params.id)

        res.json({
            success: true,
            message: req.t('messages.success'),
            data: product
        });
    }

    async update(req, res) {
        let body = req.body;

        await Product.findByIdAndUpdate(req.params.id, {
            title: body.title,
            description: body.description
        });

        res.json({
            success: true,
            message: req.t('messages.success'),
        });
    }

    async destroy(req, res) {
        await Product.findByIdAndRemove(req.params.id)

        res.json({
            success: true,
            message: req.t('messages.success'),
        });

    }
}

export default new ProductController();