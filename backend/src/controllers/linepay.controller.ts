import { Request, Response } from 'express';
import { createLinepayOrder, confirmLinepayOrder } from '@/service/linepay.service';
import { env } from '@/utils/env';

export const createLinepay = async (req: Request, res: Response) => {
  const url = await createLinepayOrder(req, res);
  res.status(200).send({
    data: {
      url,
    },
    message: '建單成功',
    status: 'success',
  });
};

export const confirmLinepay = async (req: Request, res: Response) => {
  const result = await confirmLinepayOrder(req, res);
  if (result != null) {
    res.redirect(`${env.CLIENT_URL}/activity/main/${result}`);
  } else {
    res.status(400).send({
      message: '付款失敗',
    });
  }
};
