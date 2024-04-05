export type Users = {
  uid: string;
  name: string;
  email?: string;
  bio?: string;
  avatar: string;
};

export type ChatMessage = {
  id?: string;
  uid: string;
  text: string;
  createdAt: { seconds: number; nanoseconds: number };
};

export type FormVals = {
  name?: string;
  email?: string;
  password?: string;
  bio?: string;
};
