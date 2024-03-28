export type Users = {
  uid: string;
  email?: string;
  name: string;
  bio?: string;
  avatar: string;
};

export type ChatMessage = {
  id?: string;
  uid: string;
  text: string;
  createdAt: { seconds: number; nanoseconds: number };
};
