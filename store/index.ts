import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import authSlice from '@/features/auth/authSlice'
import projectSlice from '@/features/project/projectSlice'
import issueSlice from '@/features/issue/issueSlice'
import commentSlice from '@/features/comment/commentSlice'
import notificationSlice from '@/features/notifications/notificationSlice'
import activityLogSlice from '@/features/activity-log/activityLogSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectSlice,
    issues: issueSlice,
    comments: commentSlice,
    notifications: notificationSlice,
    activityLogs: activityLogSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector