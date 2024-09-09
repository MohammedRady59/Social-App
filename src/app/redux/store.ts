import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./feature/RegisterSlice/RegisterSlice";
import LoginSlice from "./feature/LoginSlice/LoginSlice";
import { useDispatch } from "react-redux";
import PostSlice from "./feature/PostSlice/PostSlice";

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
    post: PostSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
