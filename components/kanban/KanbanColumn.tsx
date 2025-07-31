'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Issue } from '@/lib/types'
import { IssueCard } from './IssueCard'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface KanbanColumnProps {
  id: string
  title: string
  color: string
  issues: Issue[]
}

export function KanbanColumn({ id, title, color, issues }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  })

  return (
    <div className="flex-shrink-0 w-80">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <span className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full px-2 py-1">
            {issues.length}
          </span>
        </div>
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      <div
        ref={setNodeRef}
        className={cn(
          "min-h-96 p-2 rounded-lg transition-colors",
          isOver ? "bg-blue-50 dark:bg-blue-900/20" : "bg-gray-50 dark:bg-gray-800/50"
        )}
      >
        <SortableContext items={issues.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
            {issues.length === 0 && (
              <Card className="p-4 text-center text-gray-500 dark:text-gray-400">
                No issues in {title.toLowerCase()}
              </Card>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  )
}