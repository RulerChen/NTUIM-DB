import {
  getActivityAll,
  createActivity,
  followActivity,
  getFollowedActivity,
  getActivityByTitle,
  // findActivityNeedAttention,
  // getActivityByTag,
  // getActivityByTime,
  // getActivityMember,
  // getActivityNumber,
  // getActivityRating,
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
// router.get('/join/:member_id', getJoinedActivity);

//getHostedActivity
// router.get('/host/:member_id', getHostedActivity);

//getChatgroup
// router.get('/:activity_id/chatgroup', getChatgroup);

//getMessage
// router.get('/chatgroup/:chatgroup_id/message', getMessage);

//insertMessage
// router.post('/chatgroup/message', insertMessage);

//rateActivity
// router.post('/rate', rateActivity);

//getActivityRating
// router.get('/:activity_id/rating', getActivityRating);

//getActivityNumber
// router.get('/:activity_id/number', getActivityNumber);

//getActivityMember
// router.get('/:activity_id/member', getActivityMember);

//kickMember
// router.delete('/:activity_id/:member_id', kickMember);

//findActivityNeedAttention
// router.get('/attention', findActivityNeedAttention);

//getAllMember
// router.get('/member', getAllMember);

export default router;
