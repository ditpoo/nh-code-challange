import express, { Request, Response, NextFunction } from 'express';
import { logger } from './core/logger';
import bodyParser from 'body-parser';
import './database/config/db'; // initialize database
import { NotFoundError, ApiError } from './core/apiError';
import routesV1 from './routes/v1';
import { ApiResponse } from './core/apiResponse';

process.on('uncaughtException', (e) => {
    logger.error(e);
});

const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 50000 }));

// Routes
app.use('/v1', routesV1);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err);
    if (err instanceof ApiError) {
        return new ApiResponse(err.status, err.message, false).send(res);
    } else {
        return new ApiResponse(500, 'Server Error', false);
    }
});

export default app;
