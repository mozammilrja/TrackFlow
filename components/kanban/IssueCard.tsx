'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Issue } from '@/lib/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn, getPriorityColor, getInitials, formatDate } from '@/lib/utils'
import { Clock, MessageCircle, Paperclip } from 'lucide-react'

interface IssueCardProps {
  issue: Issue
  isDragging?: boolean
}

export function IssueCard({ issue, isDragging }: IssueCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: issue.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging || isDragging ? 0.5 : 1,
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-pointer hover:shadow-md transition-shadow",
        (isSortableDragging || isDragging) && "shadow-lg"
      )}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">
              {issue.title}
            </h4>
            <Badge 
              variant="outline" 
              className={cn("text-xs", getPriorityColor(issue.priority))}
            >
              {issue.priority}
            </Badge>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {issue.description}
          </p>

          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {issue.labels.slice(0, 3).map((label) => (
                <Badge key={label} variant="secondary" className="text-xs">
                  {label}
                </Badge>
              ))}
              {issue.labels.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{issue.labels.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-3 w-3" />
              <span>0</span>
              <Paperclip className="h-3 w-3" />
              <span>0</span>
            </div>
            
            {issue.dueDate && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatDate(issue.dueDate)}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              #{issue.id.slice(0, 8)}
            </span>
            
            {issue.assignee && (
              <Avatar className="h-6 w-6">
                <AvatarImage src={issue.assignee.avatar} />
                <AvatarFallback className="text-xs">
                  {getInitials(issue.assignee.name)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}