import 'dotenv/config';
import express from 'express';
import productRoutes from '../routes/products.js';
import i18next from 'i18next';
import i18nexFsBackend from 'i18next-fs-backend';
import i18nextHttpMiddleware from 'i18next-http-middleware';

i18next
    .use(i18nexFsBackend)
    .use(i18nextHttpMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json',
        },
        fallbackLng: 'en',
        preload: ['en', 'fa']
    });

const app = express();

app.use(i18nextHttpMiddleware.handle(i18next));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.url);
    next();
})

app.use('/api/products', productRoutes);

export default app;