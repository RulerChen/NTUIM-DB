import express from 'express';
import { isAuth } from '@/utils/isAuth';
import { createLinepay, confirmLinepay } from '@/controllers/linepay.controller';

const router = express.Router();

router.post('/', isAuth, createLinepay);

router.get('/confirm', confirmLinepay);

export default router;
