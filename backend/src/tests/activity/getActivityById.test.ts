import { getActivityById } from '@/controllers/activity.controller';
import { Request, Response } from 'express';
import { pool } from '@/models/init';
jest.mock('@/models/init', () => ({
  pool: {
    query: jest.fn(),
  },
}));

const mockRequest = (query: any) => ({
  query,
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('getActivityById', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return activity details and host information when activity_id is provided', async () => {
    const req = mockRequest({ activity_id: '1' });
    const res = mockResponse();

    const mockRows = [
      {
        activity_id: '1',
        title: 'Sample Activity',
        name: 'Host Name',
        member_id: '100',
      },
    ];
    const mockResult = { rows: mockRows };

    (pool.query as jest.Mock).mockResolvedValue(mockResult);

    await getActivityById(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1']);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRows[0]);
  });

  it('should return 400 if database query fails', async () => {
    const req = mockRequest({ activity_id: '1' });
    const res = mockResponse();

    const mockError = new Error('Database error');
    (pool.query as jest.Mock).mockRejectedValue(mockError);

    await getActivityById(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1']);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });
});
