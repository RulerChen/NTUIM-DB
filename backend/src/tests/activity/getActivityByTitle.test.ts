import { Request, Response } from 'express';
import { getActivityByTitle } from '../../controllers/activity.controller';
import { pool } from '@/models/init';

const mockRequest = (query: any) => ({
  query,
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

jest.mock('@/models/init', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('getActivityByTitle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return activities with matching title', async () => {
    const req = mockRequest({ title: 'test' });
    const res = mockResponse();

    const mockRows = [{ id: 1, title: 'Test Activity', status: 'active' }];
    const mockResult = { rows: mockRows };

    (pool.query as jest.Mock).mockResolvedValue(mockResult);

    await getActivityByTitle(req as Request, res as Response);

    expect(pool.query as jest.Mock).toHaveBeenCalledWith(expect.any(String), ['%test%']);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRows);
  });

  it('should return 400 if database query fails', async () => {
    const req = mockRequest({ title: 'test' });
    const res = mockResponse();

    const mockError = new Error('Database error');
    (pool.query as jest.Mock).mockRejectedValue(mockError);

    await getActivityByTitle(req as Request, res as Response);

    expect(pool.query as jest.Mock).toHaveBeenCalledWith(expect.any(String), ['%test%']);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });
});
