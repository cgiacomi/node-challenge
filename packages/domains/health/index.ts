import { getHealth } from './routes/health';
import { Router } from 'express';

export const router = Router();

router.get('/', getHealth);
