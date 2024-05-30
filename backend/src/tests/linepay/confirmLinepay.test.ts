import { confirmLinepayOrder } from '@/service/linepay.service';
import { confirmLinepay } from '@/controllers/linepay.controller';
import { Request, Response } from 'express';
import { env } from '@/utils/env';

jest.mock('@/service/linepay.service', () => ({
  confirmLinepayOrder: jest.fn(),
}));

const mockRequest = () => ({});

const mockResponse = () => {
  const res: any = {};
  res.redirect = jest.fn().mockReturnThis();
  res.status = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  return res;
};

describe('confirmLinepay', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to activity main page when LinePay order is confirmed', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockResult = 'mocked-activity-id';
    (confirmLinepayOrder as jest.Mock).mockResolvedValue(mockResult);

    await confirmLinepay(req as Request, res as Response);

    expect(confirmLinepayOrder).toHaveBeenCalledWith(req, res);
    expect(res.redirect).toHaveBeenCalledWith(`${env.CLIENT_URL}/activity/main/${mockResult}`);
  });

  it('should return 400 with message when LinePay order confirmation fails', async () => {
    const req = mockRequest();
    const res = mockResponse();
    (confirmLinepayOrder as jest.Mock).mockResolvedValue(null);

    await confirmLinepay(req as Request, res as Response);

    expect(confirmLinepayOrder).toHaveBeenCalledWith(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: '付款失敗' });
  });
});
