export type User = {
  username: string;
  password: string;
  email: string;
};

export type UserSerialized = {
  _id?: string;
  email?: string;
};
