import mongoose from 'mongoose';
import logger from '../app/helpers/logger.js';

export function connect() {
    mongoose.connect(process.env.DB_URI)
        .then(() => {
            console.log('Connected successfully!');
        })
        .catch(err => {
            logger.error(err.message, { stack: err.stack });
            console.log('Can not connect to db!');
        });
}