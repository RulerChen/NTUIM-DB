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
  joinActivity,
  quitActivity,
  rateActivity,
  kickMember,
  // findActivityNeedAttention,
  // getActivityByTag,
  // getActivityByTime,
  // getActivityNumber,
  getAllMember,
  getChatgroup,
  // getHostedActivity,
  // getJoinedActivity,
  // getJoinedActivityByTag,
  getMessage,
  insertMessage,
} from '@/controllers/activity.controller';
import express from 'express';
import { isAuth } from '@/utils/isAuth';

const router = express.Router();

router.get('/', getActivityAll);

// createActivity
router.post('/', isAuth, createActivity);

// followActivity
router.post('/follow', isAuth, followActivity);

//getFollowedActivity
router.get('/follow', isAuth, getFollowedActivity);

// getActivityByTitle
router.get('/title', getActivityByTitle);

// getActivityById;
router.get('/id', getActivityById);

// getActivityCapacity
router.get('/capacity', getActivityCapacity);

// getActivityComments
router.get('/comment', getActivityComments);

// getActivityRating
router.get('/rating', getActivityRating);

//getActivityMember
router.get('/member', getActivityMember);

// deleteActivity
router.delete('/', isAuth, deleteActivity);

//joinActivity
router.post('/join', isAuth, joinActivity);

// quitActivity
router.delete('/quit', isAuth, quitActivity);

//rateActivity
router.post('/rate', rateActivity);

//kickMember
router.delete('/kick', kickMember);

//getActivityByTime
// router.get('/:event_start_timestamp/:event_end_timestamp', getActivityByTime);

//getActivityByTag
// router.get('/:activity_tag', getActivityByTag);

//getJoinedActivityByTag
// router.get('/:activity_tag/join', getJoinedActivityByTag);

//getJoinedActivity
router.get('/join', isAuth, getJoinedActivity);

//getHostedActivity
router.get('/host', isAuth, getHostedActivity);

//getChatgroup
router.get('/:activity_id/chatgroup', getChatgroup);

//getMessage
router.get('/chatgroup/:chatgroup_id/message', getMessage);

//insertMessage
router.post('/chatgroup/message', insertMessage);

//getActivityNumber
// router.get('/:activity_id/number', getActivityNumber);

//findActivityNeedAttention
// router.get('/attention', findActivityNeedAttention);

//getAllMember
router.get('/allmember', getAllMember);

export default router;
