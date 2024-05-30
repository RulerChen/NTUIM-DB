import { getAllMember } from '@/controllers/activity.controller';
import { Request, Response } from 'express';
import { pool } from '@/models/init';
jest.mock('@/models/init', () => ({
  pool: {
    query: jest.fn(),
  },
}));

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnThis();
  res.json = jest.fn().mockReturnThis();
  return res;
};

describe('getAllMember', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all members', async () => {
    const req = {};
    const res = mockResponse();

    const mockRows = [
      { member_id: '1', name: 'Member 1' },
      { member_id: '2', name: 'Member 2' },
    ];
    const mockResult = { rows: mockRows };

    (pool.query as jest.Mock).mockResolvedValue(mockResult);

    await getAllMember(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRows);
  });

  it('should return 400 if database query fails', async () => {
    const req = {};
    const res = mockResponse();

    const mockError = new Error('Database error');
    (pool.query as jest.Mock).mockRejectedValue(mockError);

    await getAllMember(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String));
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });
});
