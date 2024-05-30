import { kickMember } from '@/controllers/activity.controller';
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

describe('kickMember', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully kick a member from activity', async () => {
    const req = mockRequest({ activity_id: '1', member_id: '2' });
    const res = mockResponse();

    (pool.query as jest.Mock).mockResolvedValueOnce({});
    (pool.query as jest.Mock).mockResolvedValueOnce({});

    await kickMember(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1', '2']);
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1', '2']);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("You've successfully kicked the member!");
  });

  it('should return 400 if database query fails', async () => {
    const req = mockRequest({ activity_id: '1', member_id: '2' });
    const res = mockResponse();

    const mockError = new Error('Database error');
    (pool.query as jest.Mock).mockRejectedValue(mockError);

    await kickMember(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1', '2']);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });
});
