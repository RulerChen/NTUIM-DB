import {
  getActivityAll,
  createActivity,
  followActivity,
  getFollowedActivity,
  getActivityByTitle,
  getJoinedActivity,
  getHostedActivity,
  getActivityById,
  getActivityCapacity,
  getActivityComments,
  getActivityRating,
  getActivityMember,
  deleteActivity,
  quitActivity,
  rateActivity,
  kickMember,
  getAllMember,
  getChatgroup,
  getMessage,
  insertMessage,
  joinActivity,
} from '@/controllers/activity.controller';
import express from 'express';
import { isAuth } from '@/utils/isAuth';

const router = express.Router();

router.get('/', getActivityAll);
router.post('/', isAuth, createActivity);
router.delete('/', isAuth, deleteActivity);

router.post('/follow', isAuth, followActivity);
router.get('/follow', isAuth, getFollowedActivity);

router.get('/title', getActivityByTitle);

router.get('/id', getActivityById);

router.get('/capacity', getActivityCapacity);

router.get('/comment', getActivityComments);

router.get('/rating', getActivityRating);

router.get('/member', getActivityMember);

router.delete('/quit', isAuth, quitActivity);

router.post('/rate', rateActivity);

router.delete('/kick', kickMember);

router.get('/join', isAuth, getJoinedActivity);

router.get('/host', isAuth, getHostedActivity);

router.get('/allmember', getAllMember);

router.get('/:activity_id/chatgroup', getChatgroup);

router.get('/chatgroup/:chatgroup_id/message', getMessage);

router.post('/chatgroup/message', insertMessage);

router.post('/joinActivity/', joinActivity);

export default router;
