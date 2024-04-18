import express from 'express';

import UserRoutes from './user.routes';
import ActivityRoutes from './activity.routes';
import LinePayRoutes from './linepay.routes';

const router = express.Router();

router.use('/user', UserRoutes);
router.use('/activity', ActivityRoutes);
router.use('/linepay', LinePayRoutes);

export default router;
