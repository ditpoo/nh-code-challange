import mongoose from 'mongoose';
import { logger } from '../../core/logger';

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
};

const uri = process.env.DB_URI || 'mongodb://localhost:27017/nbstore';

mongoose
    .connect(uri, options)
    .then(() => {
        logger.info('Mongoose connection done');
    })
    .catch((e) => {
        logger.info('Mongoose connection error');
        logger.error(e);
    });
