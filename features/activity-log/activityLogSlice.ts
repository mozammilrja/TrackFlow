import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ActivityLog } from '@/lib/types'

interface ActivityLogState {
  logs: ActivityLog[]
  isLoading: boolean
  error: string | null
}

const initialState: ActivityLogState = {
  logs: [],
  isLoading: false,
  error: null,
}

export const fetchActivityLogs = createAsyncThunk(
  'activityLogs/fetchActivityLogs',
  async (projectId: string) => {
    // Mock API call - replace with actual API
    const mockLogs: ActivityLog[] = [
      {
        id: '1',
        action: 'created issue',
        entityType: 'issue',
        entityId: '1',
        userId: 'user1',
        user: { id: 'user1', name: 'John Doe', email: 'john@example.com' },
        createdAt: new Date(),
        metadata: { issueTitle: 'Setup project structure' }
      }
    ]
    return mockLogs
  }
)

const activityLogSlice = createSlice({
  name: 'activityLogs',
  initialState,
  reducers: {
    addActivityLog: (state, action: PayloadAction<ActivityLog>) => {
      state.logs.unshift(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityLogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchActivityLogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.logs = action.payload
      })
      .addCase(fetchActivityLogs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch activity logs'
      })
  },
})

export const { addActivityLog } = activityLogSlice.actions
export default activityLogSlice.reducer