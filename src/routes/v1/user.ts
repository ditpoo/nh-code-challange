import express from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { create } from '../../controllers/user';
import authMiddleware from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, asyncHandler(create));

export default router;
