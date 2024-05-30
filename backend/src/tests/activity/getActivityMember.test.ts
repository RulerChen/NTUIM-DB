import { getActivityMember } from '@/controllers/activity.controller';
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

describe('getActivityMember', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return participants of an activity', async () => {
    const req = mockRequest({ activity_id: '1' });
    const res = mockResponse();

    const mockRows = [
      { name: 'Participant 1', member_id: '1', activity_role: 'Participant' },
      { name: 'Participant 2', member_id: '2', activity_role: 'Participant' },
    ];
    const mockResult = { rows: mockRows };

    (pool.query as jest.Mock).mockResolvedValue(mockResult);

    await getActivityMember(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1']);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRows);
  });

  it('should return 400 if database query fails', async () => {
    const req = mockRequest({ activity_id: '1' });
    const res = mockResponse();

    const mockError = new Error('Database error');
    (pool.query as jest.Mock).mockRejectedValue(mockError);

    await getActivityMember(req as Request, res as Response);

    expect(pool.query).toHaveBeenCalledWith(expect.any(String), ['1']);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });
});
