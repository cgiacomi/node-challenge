import { Router } from 'express';

import { getAllExpenses, getExpense } from './routes/v1-get-expenses';

export const router = Router();

router.get('/:expenseId', getExpense);
router.get('/', getAllExpenses);
