import {
  followActivityPayload,
  getActivityByTitlePayload,
  getActivityByTagPayload,
  getActivityByTimePayload,
  getChatgroupPayload,
  // getFollowedActivityPayload,
  // getHostedActivityPayload,
  getJoinedActivityByTagPayload,
  // getJoinedActivityPayload,
  getMessagePayload,
  insertMessagePayload,
  // joinActivityPayload,
  kickMemberPayload,
  // quitActivityPayload,
  rateActivityPayload,
  // getFollowedActivityPayload,
} from '@/lib/shared_types';
import instance from '@/lib/axios';

export default function useActivity() {
  /* TODO: route may change */

  //getAllActivity
  const getAllActivity = async (category: string | null) => {
    const { data } = await instance.get('/activity', {
      params: {
        category,
      },
    });
    return data;
  };

  //getActivityByDescription
  const getActivityByTitle = async ({ title }: getActivityByTitlePayload) => {
    const { data } = await instance.get('/activity/title', {
      params: {
        title,
      },
    });
    return data;
  };

  // getActivityById
  const getActivityById = async (activity_id: string) => {
    const { data } = await instance.get(`/activity/id`, {
      params: {
        activity_id,
      },
    });
    return data;
  };

  // get remained capacity of activity
  const getActivityCapacity = async (activity_id: string) => {
    const { data } = await instance.get(`/activity/capacity`, {
      params: {
        activity_id,
      },
    });
    return data;
  };

  // getActivityCommments
  const getActivityComments = async (activity_id: string) => {
    const { data } = await instance.get(`/activity/comment`, {
      params: {
        activity_id,
      },
    });
    return data;
  };

  const getActivityRating = async (activity_id: string) => {
    const { data } = await instance.get(`/activity/rating`, {
      params: {
        activity_id,
      },
    });
    return data;
  };

  //getActivityMember
  const getActivityMember = async (activity_id: string) => {
    const { data } = await instance.get(`/activity/member`, {
      params: {
        activity_id,
      },
    });
    return data;
  };

  const deleteActivity = async (activity_id: string) => {
    const { data } = await instance.delete(`/activity`, {
      params: {
        activity_id,
      },
    });
    return data;
  };

  //getActivityByTime
  const getActivityByTime = async ({
    event_start_timestamp,
    event_end_timestamp,
  }: getActivityByTimePayload) => {
    return instance.get(`/activity/${event_start_timestamp}/${event_end_timestamp}`);
  };

  //getActivityByTag
  const getActivityByTag = async ({ activity_tag }: getActivityByTagPayload) => {
    return instance.get(`/activity/${activity_tag}`);
  };

  //getJoinedActivityByTag
  const getJoinedActivityByTag = async ({ activity_tag }: getJoinedActivityByTagPayload) => {
    return instance.get(`/activity/${activity_tag}/join`);
  };

  //followActivity
  const followActivity = async ({ activity_id }: followActivityPayload) => {
    return instance.post('/activity/follow', { activity_id });
  };

  //joinActivity
  const joinActivity = async (activity_id: string) => {
    const { data } = await instance.post('/activity/joinActivity', { activity_id });
    return data.data.url;
  };

  //quitActivity
  const quitActivity = async (activity_id: string) => {
    const { data } = await instance.delete(`/activity/quit`, {
      params: {
        activity_id,
      },
    });
    return data;
  };

  //getJoinedActivity
  const getJoinedActivity = async () => {
    const { data } = await instance.get(`/activity/join/`);
    return data;
  };

  //getFollowedActivity
  const getFollowedActivity = async () => {
    const { data } = await instance.get(`/activity/follow/`);
    return data;
  };

  //getHostedActivity
  const getHostedActivity = async () => {
    const { data } = await instance.get(`/activity/host/`);
    return data;
  };

  //getChatgroup
  const getChatgroup = async ({ activity_id }: getChatgroupPayload) => {
    const { data } = await instance.get(`/activity/${activity_id}/chatgroup`);
    return data;
  };

  //getMessage
  const getMessage = async ({ chatgroup_id }: getMessagePayload) => {
    return instance.get(`/activity/chatgroup/${chatgroup_id}/message`);
  };

  //insertMessage
  const insertMessage = async ({ chatgroup_id, member_id, message_text }: insertMessagePayload) => {
    return instance.post(`/activity/chatgroup/message`, {
      chatgroup_id,
      member_id,
      message_text,
    });
  };

  //rateActivity
  const rateActivity = async ({ activity_id, score, comment }: rateActivityPayload) => {
    const { data } = await instance.post(`/activity/rate`, {
      activity_id,
      score,
      comment,
    });
    return data;
  };

  //kickMember
  const kickMember = async ({ activity_id, member_id }: kickMemberPayload) => {
    const { data } = await instance.delete(`/activity/kick`, {
      params: {
        activity_id,
        member_id,
      },
    });
    return data;
  };

  //findActivityNeedAttention
  const findActivityNeedAttention = async () => {
    return instance.get(`/activity/attention`);
  };

  //getAllMember
  const getAllMember = async () => {
    const { data } = await instance.get(`/activity/allmember`);
    return data;
  };

  return {
    getActivityByTitle,
    getActivityById,
    getActivityCapacity,
    getActivityComments,
    getActivityByTime,
    getActivityByTag,
    getJoinedActivityByTag,
    deleteActivity,
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
    getActivityMember,
    kickMember,
    findActivityNeedAttention,
    getAllActivity,
    getAllMember,
  };
}
