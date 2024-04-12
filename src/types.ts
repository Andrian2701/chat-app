export type Users = {
  uid: string;
  name: string;
  email?: string;
  bio?: string;
  avatar: string;
};

export type Messages = {
  id: string;
  uid: string;
  text: string;
  img?: string;
  createdAt: { seconds: number; nanoseconds: number };
};

export type FormVals = {
  name?: string;
  email?: string;
  password?: string;
  bio?: string;
};

export type Chat = {
  chat: {
    chatId: string;
    user: Users;
  };
};
