'use client'

import { useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { Issue } from '@/lib/types'
import { KanbanColumn } from './KanbanColumn'
import { IssueCard } from './IssueCard'
import { useAppDispatch, useAppSelector } from '@/store'
import { moveIssue } from '@/features/issue/issueSlice'

const columns = [
  { id: 'backlog', title: 'Backlog', color: 'bg-gray-100' },
  { id: 'todo', title: 'To Do', color: 'bg-blue-100' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-100' },
  { id: 'done', title: 'Done', color: 'bg-green-100' },
] as const

export function KanbanBoard() {
  const dispatch = useAppDispatch()
  const issues = useAppSelector(state => state.issues.filteredIssues)
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const issue = issues.find(i => i.id === active.id)
    if (issue) {
      setActiveIssue(issue)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveIssue(null)

    if (!over) return

    const activeIssueId = active.id as string
    const overColumnId = over.id as string

    if (columns.find(col => col.id === overColumnId)) {
      // Dropped on a column
      dispatch(moveIssue({
        issueId: activeIssueId,
        newStatus: overColumnId as Issue['status'],
        newPosition: 0
      }))
    }
  }

  const getIssuesByStatus = (status: string) => {
    return issues.filter(issue => issue.status === status)
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-full overflow-x-auto pb-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            color={column.color}
            issues={getIssuesByStatus(column.id)}
          />
        ))}
      </div>

      {typeof window !== 'undefined' && createPortal(
        <DragOverlay>
          {activeIssue && <IssueCard issue={activeIssue} isDragging />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}