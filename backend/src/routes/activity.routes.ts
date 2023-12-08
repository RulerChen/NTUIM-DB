import {
  createActivity,
  findActivityNeedAttention,
  followActivity,
  getActivityByDescription,
  getActivityByTag,
  getActivityByTime,
  getActivityMember,
  getActivityNumber,
  getActivityRating,
  getAllActivity,
  getAllMember,
  getChatgroup,
  getFollowedActivity,
  getHostedActivity,
  getJoinedActivity,
  getMessage,
  insertMessage,
  joinActivity,
  kickMember,
  quitActivity,
  rateActivity,
} from '@/controllers/activity.controller';
import express from 'express';

const router = express.Router();

// createActivity
router.post('/', createActivity);

//getActivityByDescription
router.get('/:description', getActivityByDescription);

//getActivityByTime
router.get('/:event_start_timestamp/:event_end_timestamp', getActivityByTime);

//getActivityByTag
router.get('/:activity_tag', getActivityByTag);

//followActivity
router.post('/follow', followActivity);

//joinActivity
router.post('/join', joinActivity);

//quitActivity
router.delete('/:member_id/:activity_id', quitActivity);

//getJoinedActivity
router.get('/:member_id/join', getJoinedActivity);

//getFollowedActivity
router.get('/:member_id/follow', getFollowedActivity);

//getHostedActivity
router.get('/:member_id/host', getHostedActivity);

//getChatgroup
router.get('/chatgroup/:activity_id', getChatgroup);

//getMessage
router.get('/message/:chatgroup_id', getMessage);

//insertMessage
router.post('/message', insertMessage);

//rateActivity
router.post('/rate', rateActivity);

//getActivityRating
router.get('/:activity_id/rating', getActivityRating);

//getActivityNumber
router.get('/:activity_id/number', getActivityNumber);

//getActivityMember
router.get('/:activity_id/member', getActivityMember);

//kickMember
router.delete('/:member_id/:activity_id', kickMember);

//findActivityNeedAttention
router.get('/attention', findActivityNeedAttention);

//getAllActivity
router.get('/', getAllActivity);

//getAllMember
router.get('/member', getAllMember);

export default router;
