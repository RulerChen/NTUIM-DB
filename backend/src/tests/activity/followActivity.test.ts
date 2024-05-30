import { followActivity } from '@/controllers/activity.controller';
import { Request, Response } from 'express';
import { pool } from '@/models/init';

jest.mock('@/models/init', () => ({
  pool: {
    query: jest.fn(),
  },
}));

const mockRequest = (user: any, body: any) => ({
  user,
  body,
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('followActivity', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should unfollow the activity if the user is already following it', async () => {
    const req = mockRequest({ member_id: '1' }, { activity_id: '101' });
    const res = mockResponse();

    const mockCheckResult = { rows: [{ member_id: '1', activity_id: '101' }] };
    const mockDeleteResult = { rowCount: 1 };

    (pool.query as jest.Mock)
      .mockResolvedValueOnce(mockCheckResult) // Check query
      .mockResolvedValueOnce(mockDeleteResult); // Delete query

    await followActivity(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1', '101']);
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1', '101']);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("You've successfully unfollowed the activity!");
  });

  it('should follow the activity if the user is not following it', async () => {
    const req = mockRequest({ member_id: '1' }, { activity_id: '101' });
    const res = mockResponse();

    const mockCheckResult = { rows: [] };
    const mockInsertResult = { rowCount: 1 };

    (pool.query as jest.Mock)
      .mockResolvedValueOnce(mockCheckResult) // Check query
      .mockResolvedValueOnce(mockInsertResult); // Insert query

    await followActivity(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1', '101']);
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['101', '1']);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("You've successfully followed the activity!");
  });

  it('should return 400 if database query fails', async () => {
    const req = mockRequest({ member_id: '1' }, { activity_id: '101' });
    const res = mockResponse();

    const mockError = new Error('Database error');
    (pool.query as jest.Mock).mockRejectedValue(mockError);

    await followActivity(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1', '101']);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });
});
