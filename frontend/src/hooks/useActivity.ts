import {
  createActivityData,
  followActivityData,
  getActivityByDescriptionData,
  getActivityByTagData,
  getActivityByTimeData,
  getActivityNumberData,
  getActivityRatingData,
  getChatgroupData,
  getFollowedActivityData,
  getHostedActivityData,
  getJoinedActivityByTagData,
  getJoinedActivityData,
  getMessageData,
  insertMessageData,
  joinActivityData,
  kickMemberData,
  quitActivityData,
  rateActivityData,
} from '@/lib/shared_types';
import instance from '@/lib/axios';

export default function useActivity() {
  /* TODO: route may change */
  //createActivity
  const createActivity = async (activity: createActivityData) => {
    return instance.post('/activity', activity);
  };

  //getActivityByDescription
  const getActivityByDescription = async ({ description }: getActivityByDescriptionData) => {
    return instance.get(`/activity/${description}`);
  };

  //getActivityByTime
  const getActivityByTime = async ({
    event_start_timestamp,
    event_end_timestamp,
  }: getActivityByTimeData) => {
    return instance.get(`/activity/${event_start_timestamp}/${event_end_timestamp}`);
  };

  //getActivityByTag
  const getActivityByTag = async ({ activity_tag }: getActivityByTagData) => {
    return instance.get(`/activity/${activity_tag}`);
  };

  //getJoinedActivityByTag
  const getJoinedActivityByTag = async ({ activity_tag }: getJoinedActivityByTagData) => {
    return instance.get(`/activity/${activity_tag}/join`);
  };

  //followActivity
  const followActivity = async ({ activity_id, member_id }: followActivityData) => {
    return instance.post('/activity/follow', { activity_id, member_id });
  };

  //joinActivity
  const joinActivity = async ({ activity_id, member_id }: joinActivityData) => {
    return instance.post('/activity/join', { activity_id, member_id });
  };

  //quitActivity
  const quitActivity = async ({ activity_id, member_id }: quitActivityData) => {
    return instance.delete(`/activity/${activity_id}/${member_id}`);
  };

  //getJoinedActivity
  const getJoinedActivity = async ({ member_id }: getJoinedActivityData) => {
    return instance.get(`/activity/join/${member_id}`);
  };

  //getFollowedActivity
  const getFollowedActivity = async ({ member_id }: getFollowedActivityData) => {
    return instance.get(`/activity/follow/${member_id}`);
  };

  //getHostedActivity
  const getHostedActivity = async ({ member_id }: getHostedActivityData) => {
    return instance.get(`/activity/host/${member_id}`);
  };

  //getChatgroup
  const getChatgroup = async ({ activity_id }: getChatgroupData) => {
    return instance.get(`/activity/${activity_id}/chatgroup`);
  };

  //getMessage
  const getMessage = async ({ chatgroup_id }: getMessageData) => {
    return instance.get(`/activity/chatgroup/${chatgroup_id}/message`);
  };

  //insertMessage
  const insertMessage = async ({ chatgroup_id, member_id, message_text }: insertMessageData) => {
    return instance.post(`/activity/chatgroup/message`, {
      chatgroup_id,
      member_id,
      message_text,
    });
  };

  //rateActivity
  const rateActivity = async ({ activity_id, member_id, score, comment }: rateActivityData) => {
    return instance.post(`/activity/rate`, { activity_id, member_id, score, comment });
  };

  //getActivityRating
  const getActivityRating = async ({ activity_id }: getActivityRatingData) => {
    return instance.get(`/activity/${activity_id}/rating`);
  };

  //getActivityNumber
  const getActivityNumber = async ({ activity_id }: getActivityNumberData) => {
    return instance.get(`/activity/${activity_id}/number`);
  };

  //getActivityMember
  const getActivityMember = async ({ activity_id }: getActivityNumberData) => {
    return instance.get(`/activity/${activity_id}/member`);
  };

  //kickMember
  const kickMember = async ({ activity_id, member_id }: kickMemberData) => {
    return instance.delete(`/activity/${activity_id}/${member_id}`);
  };

  //findActivityNeedAttention
  const findActivityNeedAttention = async () => {
    return instance.get(`/activity/attention`);
  };

  //getAllActivity
  const getAllActivity = async () => {
    return instance.get(`/activity`);
  };

  //getAllMember
  const getAllMember = async () => {
    return instance.get(`/activity/member`);
  };

  return {
    createActivity,
    getActivityByDescription,
    getActivityByTime,
    getActivityByTag,
    getJoinedActivityByTag,
    followActivity,
    joinActivity,
    quitActivity,
    getJoinedActivity,
    getFollowedActivity,
    getHostedActivity,
    getChatgroup,
    getMessage,
    insertMessage,
    rateActivity,
    getActivityRating,
    getActivityNumber,
    getActivityMember,
    kickMember,
    findActivityNeedAttention,
    getAllActivity,
    getAllMember,
  };
}
