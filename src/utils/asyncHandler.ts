import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../middleware/authMiddleware';

export default function asyncHandler(controller: (req: RequestWithUser, res: Response) => Promise<void>) {
    return async function (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> {
        Promise.resolve(controller(req, res)).catch(next);
    };
}
