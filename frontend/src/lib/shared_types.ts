import { z } from 'zod';

export type ActivityData = {
  activity_id: string;
  description: string;
  event_start_timestamp: Date;
  event_end_timestamp: Date;
  Location: string;
  capacity: number;
  status: 'cancel' | 'active';
  register_start_timestamp: Date;
  register_end_timestamp: Date;
  non_student_fee: number;
  Student_fee: number;

  //雖然不屬於activity table，但是為了方便，所以放在這裡
  requirement: string;
  activity_tags: string[];
};

const MemberDataSchema = z.object({
  member_id: z.string().max(100),
  email: z.string().email().min(1).max(50),
  username: z.string().min(1).max(50),
  password: z.string().min(1).max(256),
  age: z.number().int().gte(0),
  phone_number: z.string().min(1).max(20),
  isStudent: z.enum(['Admin', 'Student', 'Non-student']),
});

const ChatgroupDataSchema = z.object({
  chatgroup_id: z.string().max(100),
  activity_id: z.string().min(1).max(100),
  chatname: z.string().min(1).max(20),
});

export type MemberData = z.infer<typeof MemberDataSchema>;

export type ChatgroupData = z.infer<typeof ChatgroupDataSchema>;

export type createActivityData = Omit<ActivityData, 'activity_id'> &
  Pick<ChatgroupData, 'chatname'>;

export type getActivityByDescriptionData = Pick<ActivityData, 'description'>;

export type getActivityByTimeData = Pick<
  ActivityData,
  'event_start_timestamp' | 'event_end_timestamp'
>;

export type getActivityByTagData = { activity_tag: string };

export type getJoinedActivityByTagData = getActivityByTagData;

export type followActivityData = Pick<ActivityData, 'activity_id'> & Pick<MemberData, 'member_id'>;

export type joinActivityData = Pick<ActivityData, 'activity_id'> & Pick<MemberData, 'member_id'>;

export type quitActivityData = Pick<ActivityData, 'activity_id'> & Pick<MemberData, 'member_id'>;

export type getJoinedActivityData = Pick<MemberData, 'member_id'>;

export type getFollowedActivityData = getJoinedActivityData;

export type getHostedActivityData = getJoinedActivityData;

export type getChatgroupData = Pick<ActivityData, 'activity_id'>;

export type getMessageData = Pick<ChatgroupData, 'chatgroup_id'>;

export type insertMessageData = Pick<ChatgroupData, 'chatgroup_id'> & {
  message_text: string;
} & Pick<MemberData, 'member_id'>;

export type rateActivityData = Pick<ActivityData, 'activity_id'> & {
  score: number;
  comment: string;
} & Pick<MemberData, 'member_id'>;

export type getActivityRatingData = Pick<ActivityData, 'activity_id'>;

export type getActivityNumberData = Pick<ActivityData, 'activity_id'>;

export type getActivityMemberData = Pick<ActivityData, 'activity_id'>;

export type kickMemberData = Pick<ActivityData, 'activity_id'> & Pick<MemberData, 'member_id'>;
