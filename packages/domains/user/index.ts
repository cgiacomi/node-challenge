import { Router } from 'express';

import { getAllUsers, getUser } from './routes/v1-get-user';

export const router = Router();

router.get('/:userId', getUser);
router.get('/', getAllUsers);
