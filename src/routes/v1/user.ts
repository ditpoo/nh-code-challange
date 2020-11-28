import express from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { create, signup } from '../../controllers/user';
import authMiddleware from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, asyncHandler(create));
router.post('/signup', authMiddleware, asyncHandler(signup));

export default router;
