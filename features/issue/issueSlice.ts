import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Issue } from '@/lib/types'

interface IssueState {
  issues: Issue[]
  filteredIssues: Issue[]
  isLoading: boolean
  error: string | null
  filters: {
    status: string[]
    priority: string[]
    assignee: string[]
    labels: string[]
    search: string
  }
}

const initialState: IssueState = {
  issues: [],
  filteredIssues: [],
  isLoading: false,
  error: null,
  filters: {
    status: [],
    priority: [],
    assignee: [],
    labels: [],
    search: '',
  },
}

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (projectId: string) => {
    // Mock API call - replace with actual API
    const mockIssues: Issue[] = [
      {
        id: '1',
        title: 'Setup project structure',
        description: 'Create the initial project structure and configuration',
        status: 'done',
        priority: 'high',
        projectId,
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        labels: ['setup', 'backend'],
        position: 0
      },
      {
        id: '2',
        title: 'Design homepage mockup',
        description: 'Create wireframes and mockups for the homepage',
        status: 'in-progress',
        priority: 'medium',
        projectId,
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        labels: ['design', 'frontend'],
        position: 0
      },
      {
        id: '3',
        title: 'Implement user authentication',
        description: 'Add login/register functionality',
        status: 'todo',
        priority: 'high',
        projectId,
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        labels: ['backend', 'auth'],
        position: 0
      },
      {
        id: '4',
        title: 'Write documentation',
        description: 'Create comprehensive project documentation',
        status: 'backlog',
        priority: 'low',
        projectId,
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date(),
        labels: ['documentation'],
        position: 0
      }
    ]
    return mockIssues
  }
)

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload)
      state.filteredIssues = [...state.issues]
    },
    updateIssue: (state, action: PayloadAction<Issue>) => {
      const index = state.issues.findIndex(i => i.id === action.payload.id)
      if (index !== -1) {
        state.issues[index] = action.payload
      }
      state.filteredIssues = [...state.issues]
    },
    deleteIssue: (state, action: PayloadAction<string>) => {
      state.issues = state.issues.filter(i => i.id !== action.payload)
      state.filteredIssues = [...state.issues]
    },
    moveIssue: (state, action: PayloadAction<{ issueId: string; newStatus: Issue['status']; newPosition: number }>) => {
      const { issueId, newStatus, newPosition } = action.payload
      const issue = state.issues.find(i => i.id === issueId)
      if (issue) {
        issue.status = newStatus
        issue.position = newPosition
      }
      state.filteredIssues = [...state.issues]
    },
    setFilters: (state, action: PayloadAction<Partial<IssueState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
      // Apply filters
      state.filteredIssues = state.issues.filter(issue => {
        const matchesStatus = state.filters.status.length === 0 || state.filters.status.includes(issue.status)
        const matchesPriority = state.filters.priority.length === 0 || state.filters.priority.includes(issue.priority)
        const matchesAssignee = state.filters.assignee.length === 0 || (issue.assigneeId && state.filters.assignee.includes(issue.assigneeId))
        const matchesLabels = state.filters.labels.length === 0 || state.filters.labels.some(label => issue.labels.includes(label))
        const matchesSearch = state.filters.search === '' || 
          issue.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          issue.description.toLowerCase().includes(state.filters.search.toLowerCase())
        
        return matchesStatus && matchesPriority && matchesAssignee && matchesLabels && matchesSearch
      })
    },
    clearFilters: (state) => {
      state.filters = {
        status: [],
        priority: [],
        assignee: [],
        labels: [],
        search: '',
      }
      state.filteredIssues = [...state.issues]
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.isLoading = false
        state.issues = action.payload
        state.filteredIssues = action.payload
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Failed to fetch issues'
      })
  },
})

export const { addIssue, updateIssue, deleteIssue, moveIssue, setFilters, clearFilters } = issueSlice.actions
export default issueSlice.reducer