import app from './app';
import { logger } from './core/logger';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
    logger.info(`server running on port : ${port}`);
}).on('error', (e) => logger.error(e));
