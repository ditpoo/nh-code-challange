import express from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { create } from '../../controllers/user';

const router = express.Router();

router.post('/', asyncHandler(create));

export default router;
