import { getUser } from './routes/v1-get-user';
import { Router } from 'express';

export const router = Router();

router.get('/:userId', getUser);
