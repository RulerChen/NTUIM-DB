import {
  createActivity,
  getActivityAll,
  findActivityNeedAttention,
  followActivity,
  getActivityByDescription,
  getActivityByTag,
  getActivityByTime,
  getActivityMember,
  getActivityNumber,
  getActivityRating,
  getAllMember,
  getChatgroup,
  getFollowedActivity,
  getHostedActivity,
  getJoinedActivity,
  getJoinedActivityByTag,
  getMessage,
  insertMessage,
  joinActivity,
  kickMember,
  quitActivity,
  rateActivity,
} from '@/controllers/activity.controller';
import express from 'express';

const router = express.Router();

router.get('/', getActivityAll);

// createActivity
router.post('/', createActivity);

//getActivityByDescription
router.get('/:description', getActivityByDescription);

//getActivityByTime
router.get('/:event_start_timestamp/:event_end_timestamp', getActivityByTime);

//getActivityByTag
router.get('/:activity_tag', getActivityByTag);

//getJoinedActivityByTag
router.get('/:activity_tag/join', getJoinedActivityByTag);

//followActivity
router.post('/follow', followActivity);

//joinActivity
router.post('/join', joinActivity);

//quitActivity
router.delete('/:activity_id/:member_id', quitActivity);

//getJoinedActivity
router.get('/join/:member_id', getJoinedActivity);

//getFollowedActivity
router.get('/follow/:member_id', getFollowedActivity);

//getHostedActivity
router.get('/host/:member_id', getHostedActivity);

//getChatgroup
router.get('/:activity_id/chatgroup', getChatgroup);

//getMessage
router.get('/chatgroup/:chatgroup_id/message', getMessage);

//insertMessage
router.post('/chatgroup/message', insertMessage);

//rateActivity
router.post('/rate', rateActivity);

//getActivityRating
router.get('/:activity_id/rating', getActivityRating);

//getActivityNumber
router.get('/:activity_id/number', getActivityNumber);

//getActivityMember
router.get('/:activity_id/member', getActivityMember);

//kickMember
router.delete('/:activity_id/:member_id', kickMember);

//findActivityNeedAttention
router.get('/attention', findActivityNeedAttention);

//getAllMember
router.get('/member', getAllMember);

export default router;
