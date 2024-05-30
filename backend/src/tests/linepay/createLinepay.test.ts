import { createLinepayOrder } from '@/service/linepay.service';
import { createLinepay } from '@/controllers/linepay.controller';
import { Request, Response } from 'express';

jest.mock('@/service/linepay.service', () => ({
  createLinepayOrder: jest.fn(),
}));

const mockRequest = () => ({});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.send = jest.fn().mockReturnThis();
  return res;
};

describe('createLinepay', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return success response with order url when creating LinePay order succeeds', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockUrl = 'mocked-linepay-order-url';
    (createLinepayOrder as jest.Mock).mockResolvedValue(mockUrl);

    await createLinepay(req as Request, res as Response);

    expect(createLinepayOrder).toHaveBeenCalledWith(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      data: { url: mockUrl },
      message: '建單成功',
      status: 'success',
    });
  });
});
