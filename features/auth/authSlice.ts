import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/lib/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  organizationId: string | null
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  organizationId: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.isLoading = false
    },
    setOrganization: (state, action: PayloadAction<string | null>) => {
      state.organizationId = action.payload
    },
    clearAuth: (state) => {
      state.user = null
      state.organizationId = null
      state.isLoading = false
    },
  },
})

export const { setUser, setOrganization, clearAuth } = authSlice.actions
export default authSlice.reducer