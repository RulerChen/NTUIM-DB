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
  // findActivityNeedAttention,
  // getActivityByTag,
  // getActivityByTime,
  // getActivityNumber,
  // getAllMember,
  // getChatgroup,
  // getHostedActivity,
  // getJoinedActivity,
  // getJoinedActivityByTag,
  // getMessage,
  // insertMessage,
  // joinActivity,
  // kickMember,
  // quitActivity,
  // rateActivity,
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

//getActivityByTime
// router.get('/:event_start_timestamp/:event_end_timestamp', getActivityByTime);

//getActivityByTag
// router.get('/:activity_tag', getActivityByTag);

//getJoinedActivityByTag
// router.get('/:activity_tag/join', getJoinedActivityByTag);

//joinActivity
// router.post('/join', joinActivity);

//quitActivity
// router.delete('/:activity_id/:member_id', quitActivity);

//getJoinedActivity
router.get('/join', isAuth, getJoinedActivity);

//getHostedActivity
router.get('/host', isAuth, getHostedActivity);

//getChatgroup
// router.get('/:activity_id/chatgroup', getChatgroup);

//getMessage
// router.get('/chatgroup/:chatgroup_id/message', getMessage);

//insertMessage
// router.post('/chatgroup/message', insertMessage);

//rateActivity
// router.post('/rate', rateActivity);

//getActivityNumber
// router.get('/:activity_id/number', getActivityNumber);

//kickMember
// router.delete('/:activity_id/:member_id', kickMember);

//findActivityNeedAttention
// router.get('/attention', findActivityNeedAttention);

//getAllMember
// router.get('/member', getAllMember);

export default router;
