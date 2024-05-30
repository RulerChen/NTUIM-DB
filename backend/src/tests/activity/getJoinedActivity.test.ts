import { getJoinedActivity } from '@/controllers/activity.controller';
import { Request, Response } from 'express';
import { pool } from '@/models/init';
jest.mock('@/models/init', () => ({
  pool: {
    query: jest.fn(),
  },
}));

const mockRequest = (user: any) => ({
  user,
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('getJoinedActivity', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return active joined activities for a member', async () => {
    const req = mockRequest({ member_id: '1' });
    const res = mockResponse();

    const mockRows = [
      { activity_id: '101', name: 'Activity 1' },
      { activity_id: '102', name: 'Activity 2' },
    ];
    const mockResult = { rows: mockRows };

    (pool.query as jest.Mock).mockResolvedValue(mockResult);

    await getJoinedActivity(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1']);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRows);
  });

  it('should return 400 if database query fails', async () => {
    const req = mockRequest({ member_id: '1' });
    const res = mockResponse();

    const mockError = new Error('Database error');
    (pool.query as jest.Mock).mockRejectedValue(mockError);

    await getJoinedActivity(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1']);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });
});
