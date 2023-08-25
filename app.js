import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/products.js';

const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.url);
    next();
})

mongoose.connect(process.env.DB_URI)
    .then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    })
    .catch(err => {
        // TODO: log to file
        console.log('Can not connect to db!');
    });

app.use('/api/products', productRoutes);