import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "./reducers/adminReducer";
import { courseReducer } from "./reducers/courseReducers";
import { otherReducer } from "./reducers/otherReducer";
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
  },
});

export default store;

export const server = "https://course-bundler-backend-ww7k.vercel.app/api/v1";
// export const server = "http://localhost:4000/api/v1";
