import { router as expenseRoutes } from '@nc/domain-expense';
import { Router } from 'express';
import { router as userRoutes } from '@nc/domain-user';

const router = Router();

router.use('/v1/expenses', expenseRoutes);
router.use('/v1/users', userRoutes);

export default router;
