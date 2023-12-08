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

export type createActivityPayload = Omit<ActivityData, 'activity_id'> &
  Pick<ChatgroupData, 'chatname'>;

export type getActivityByDescriptionPayload = Pick<ActivityData, 'description'>;

export type getActivityByTimePayload = Pick<
  ActivityData,
  'event_start_timestamp' | 'event_end_timestamp'
>;

export type getActivityByTagPayload = { activity_tag: string };

export type getJoinedActivityByTagPayload = { activity_tag: string };

export type followActivityPayload = Pick<ActivityData, 'activity_id'> &
  Pick<MemberData, 'member_id'>;

export type joinActivityPayload = Pick<ActivityData, 'activity_id'> & Pick<MemberData, 'member_id'>;

export type quitActivityPayload = Pick<ActivityData, 'activity_id'> & Pick<MemberData, 'member_id'>;

export type getJoinedActivityPayload = Pick<MemberData, 'member_id'>;

export type getFollowedActivityPayload = Pick<MemberData, 'member_id'>;

export type getHostedActivityPayload = Pick<MemberData, 'member_id'>;

export type getChatgroupPayload = Pick<ActivityData, 'activity_id'>;

export type getMessagePayload = Pick<ChatgroupData, 'chatgroup_id'>;

export type insertMessagePayload = Pick<ChatgroupData, 'chatgroup_id'> & {
  message_text: string;
} & Pick<MemberData, 'member_id'>;

export type rateActivityPayload = Pick<ActivityData, 'activity_id'> & {
  score: number;
  comment: string;
} & Pick<MemberData, 'member_id'>;

export type getActivityRatingPayload = Pick<ActivityData, 'activity_id'>;

export type getActivityNumberPayload = Pick<ActivityData, 'activity_id'>;

export type getActivityMemberPayload = Pick<ActivityData, 'activity_id'>;

export type kickMemberPayload = Pick<ActivityData, 'activity_id'> & Pick<MemberData, 'member_id'>;
