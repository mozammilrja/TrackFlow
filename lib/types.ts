export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  organizationId?: string
}

export interface Project {
  id: string
  name: string
  description: string
  organizationId: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  members: User[]
}

export interface Issue {
  id: string
  title: string
  description: string
  status: 'backlog' | 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assigneeId?: string
  assignee?: User
  projectId: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  labels: string[]
  position: number
}

export interface Comment {
  id: string
  content: string
  issueId: string
  authorId: string
  author: User
  createdAt: Date
  updatedAt: Date
}

export interface ActivityLog {
  id: string
  action: string
  entityType: 'project' | 'issue' | 'comment'
  entityId: string
  userId: string
  user: User
  createdAt: Date
  metadata?: Record<string, any>
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  userId: string
  read: boolean
  createdAt: Date
}