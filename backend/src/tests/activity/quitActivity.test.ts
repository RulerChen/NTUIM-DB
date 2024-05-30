import { quitActivity } from '@/controllers/activity.controller';
import { Request, Response } from 'express';
import { pool } from '@/models/init';
jest.mock('@/models/init', () => ({
  pool: {
    query: jest.fn(),
  },
}));

const mockRequest = (user: any, query: any) => ({
  user,
  query,
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('quitActivity', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should insert into MEMBER_QUIT_ACTIVITY and delete from activity_role when member quits an activity', async () => {
    const req = mockRequest({ member_id: '1' }, { activity_id: '101' });
    const res = mockResponse();

    const mockInsertResult = { rowCount: 1 };
    const mockDeleteResult = { rowCount: 1 };

    (pool.query as jest.Mock)
      .mockResolvedValueOnce(mockInsertResult) // Insert query
      .mockResolvedValueOnce(mockDeleteResult); // Delete query

    await quitActivity(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['101', '1']);
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['101', '1']);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("You've successfully quit the activity!");
  });

  it('should return 400 if insert query fails', async () => {
    const req = mockRequest({ member_id: '1' }, { activity_id: '101' });
    const res = mockResponse();

    const mockError = new Error('Database error');
    (pool.query as jest.Mock).mockRejectedValueOnce(mockError);

    await quitActivity(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['101', '1']);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });

  it('should return 400 if delete query fails', async () => {
    const req = mockRequest({ member_id: '1' }, { activity_id: '101' });
    const res = mockResponse();

    const mockInsertResult = { rowCount: 1 };
    const mockError = new Error('Database error');
    (pool.query as jest.Mock)
      .mockResolvedValueOnce(mockInsertResult) // Insert query
      .mockRejectedValueOnce(mockError); // Delete query

    await quitActivity(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['101', '1']);
    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['101', '1']);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });
});
