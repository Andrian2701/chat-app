"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";

import { AuthContext } from "./AuthContext";

export const ChatContext = createContext<any>(null);
export const CHANGE_USER = "CHANGE_USER";

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case CHANGE_USER:
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ chat: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
