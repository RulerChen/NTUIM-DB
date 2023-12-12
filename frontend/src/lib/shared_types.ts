import { z } from 'zod';

export type ActivityData = {
  activity_id: string;
  title: string;
  description: string;
  event_start_timestamp: Date;
  event_end_timestamp: Date;
  location: string;
  capacity: number;
  status: 'cancel' | 'active';
  register_start_timestamp: Date;
  register_end_timestamp: Date;
  non_student_fee: number;
  student_fee: number;
  activity_tag: string;
};

const MemberDataSchema = z.object({
  member_id: z.string().max(100),
  email: z.string().email().min(1).max(50),
  name: z.string().min(1).max(50),
  password: z.string().min(1).max(256),
  age: z.number().int().gte(0),
  phone: z.string().min(1).max(20),
  member_role: z.enum(['Admin', 'Student', 'Non-student']),
});

const ChatgroupDataSchema = z.object({
  chatgroup_id: z.string().max(100),
  activity_id: z.string().min(1).max(100),
  chatname: z.string().min(1).max(20),
});

const StudentDataSchema = z.object({
  member_id: z.string().max(100),
  student_id: z.string().max(100),
  school_name: z.string().min(1).max(50),
  department: z.string().min(1).max(50),
  grade: z.number().int().gte(0),
});

export type CardData = Omit<ActivityData, 'requirement'>;

export type MemberData = z.infer<typeof MemberDataSchema>;

export type ChatgroupData = z.infer<typeof ChatgroupDataSchema>;

export type StudentData = z.infer<typeof StudentDataSchema>;

export type UpdateUserPayload = Omit<MemberData, 'member_id'> &
  Omit<StudentData, 'member_id' | 'student_id'>;

export type UpdateUserPasswordPayload = { old_password: string; new_password: string };

export type UpdateUserResponse = StudentData;

export type createActivityPayload = Omit<ActivityData, 'activity_id'> &
  Pick<ChatgroupData, 'chatname'>;

export type getActivityByTitlePayload = Pick<ActivityData, 'title'>;

export type getActivityByTimePayload = Pick<
  ActivityData,
  'event_start_timestamp' | 'event_end_timestamp'
>;

export type getActivityByTagPayload = { activity_tag: string };

export type getJoinedActivityByTagPayload = { activity_tag: string };

export type followActivityPayload = Pick<ActivityData, 'activity_id'>;

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
};

export type getActivityRatingPayload = Pick<ActivityData, 'activity_id'>;

export type getActivityNumberPayload = Pick<ActivityData, 'activity_id'>;

export type getActivityMemberPayload = Pick<ActivityData, 'activity_id'>;

export type kickMemberPayload = Pick<ActivityData, 'activity_id'> & Pick<MemberData, 'member_id'>;
