import { Request, Response } from 'express';
import { getActivityAll } from '@/controllers/activity.controller';
import { pool } from '@/models/init';
import { nowDate } from '@/utils/nowDate';

jest.mock('@/models/init', () => ({
  pool: {
    query: jest.fn(),
  },
}));

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

jest.mock('@/service/cloudinary.service', () => ({
  upload: jest.fn(),
}));

describe('getActivityAll', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      query: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return active activities if category is "all"', async () => {
    req.query!.category = 'all';

    const mockResult = {
      rows: [
        { id: 1, name: 'Activity 1' },
        { id: 2, name: 'Activity 2' },
      ],
    };

    (pool.query as jest.Mock).mockResolvedValue(mockResult);

    const timestamp = nowDate();
    const querytext = `
      SELECT *
      FROM activity
      where status = 'active'
      and event_end_timestamp > $1
      order by register_start_timestamp desc
      limit 20;
      `;

    await getActivityAll(req as Request, res as Response);
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining(querytext), [timestamp]);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult.rows);
  });

  it('should return active activities with specific category', async () => {
    req.query!.category = 'sports';

    const mockResult = {
      rows: [
        { id: 3, name: 'Sports Activity 1' },
        { id: 4, name: 'Sports Activity 2' },
      ],
    };

    (pool.query as jest.Mock).mockResolvedValue(mockResult);

    const timestamp = nowDate();
    const querytext = `
    SELECT *
    FROM activity
    where status = 'active'
    and event_end_timestamp > $1    
    and activity_tag = $2
    order by register_start_timestamp asc
    limit 20;
    `;
    await getActivityAll(req as Request, res as Response);
    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining(querytext), [
      timestamp,
      'sports',
    ]);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult.rows);
  });

  it('should return 400 if query fails', async () => {
    req.query!.category = 'all';

    const mockError = new Error('Query failed');

    (pool.query as jest.Mock).mockRejectedValue(mockError);

    await getActivityAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(mockError);
  });
});
