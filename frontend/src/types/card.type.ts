export interface CardData {
  activity_id: string;
  title: string;
  description: string;
  event_start_timestamp: string;
  event_end_timestamp: string;
  location: string;
  capacity: number;
  status: string;
  register_start_timestamp: string;
  register_end_timestamp: string;
  non_student_fee: number;
  student_fee: number;
  activity_tag: string;
}
