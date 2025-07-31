import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { v4 as uuidv4 } from 'uuid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return uuidv4()
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getPriorityColor(priority: 'low' | 'medium' | 'high' | 'urgent'): string {
  switch (priority) {
    case 'low': return 'bg-green-100 text-green-800 border-green-200'
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
    case 'urgent': return 'bg-red-100 text-red-800 border-red-200'
    default: return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export function getStatusColor(status: 'backlog' | 'todo' | 'in-progress' | 'done'): string {
  switch (status) {
    case 'backlog': return 'bg-gray-100 text-gray-800'
    case 'todo': return 'bg-blue-100 text-blue-800'
    case 'in-progress': return 'bg-yellow-100 text-yellow-800'
    case 'done': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}