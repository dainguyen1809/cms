import { configureStore } from '@reduxjs/toolkit';
import toastReducer from './slice/toastSlice';
import authReducer from './slice/authSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch