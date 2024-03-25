"use client";
import { createContext, useReducer, ReactNode } from "react";

export const AlertContext = createContext<any>(null);
export const SET_ALERT = "SET_ALERT";

export const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const initialState = null;

  const AlertReducer = (state: string | null, action: any) => {
    switch (action.type) {
      case SET_ALERT:
        return action.payload;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  return (
    <AlertContext.Provider value={{ alert: state, dispatch }}>
      {children}
    </AlertContext.Provider>
  );
};
