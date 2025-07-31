import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Comment } from '@/lib/types'

interface CommentState {
  comments: Comment[]
  isLoading: boolean
  error: string | null
}

const initialState: CommentState = {
  comments: [],
  isLoading: false,
  error: null,
}

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (issueId: string) => {
    // Mock API call - replace with actual API
    const mockComments: Comment[] = [
      {
        id: '1',
        content: 'This looks good to me. Let\'s proceed with implementation.',
        issueId,
        authorId: 'user1',
        author: { id: 'user1', name: 'John Doe', email: 'john@example.com' },
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
    return mockComments
  }
)

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload)
    },
    updateComment: (state, action: PayloadAction<Comment>) => {
      const index = state.comments.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.comments[index] = action.payload
      }
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(c => c.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.comments = action.payload
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch comments'
      })
  },
})

export const { addComment, updateComment, deleteComment } = commentSlice.actions
export default commentSlice.reducer