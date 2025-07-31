'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { IssueFilters } from '@/components/filters/IssueFilters'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchIssues } from '@/features/issue/issueSlice'
import { setCurrentProject } from '@/features/project/projectSlice'
import { ArrowLeft, Settings, Users, Plus } from 'lucide-react'
import Link from 'next/link'

export default function KanbanPage() {
  const params = useParams()
  const projectId = params.id as string
  const dispatch = useAppDispatch()
  
  const currentProject = useAppSelector(state => state.projects.currentProject)
  const projects = useAppSelector(state => state.projects.projects)
  const issues = useAppSelector(state => state.issues.filteredIssues)
  const isLoading = useAppSelector(state => state.issues.isLoading)

  useEffect(() => {
    if (projectId) {
      dispatch(fetchIssues(projectId))
      
      // Set current project if not already set
      const project = projects.find(p => p.id === projectId)
      if (project && (!currentProject || currentProject.id !== projectId)) {
        dispatch(setCurrentProject(project))
      }
    }
  }, [projectId, dispatch, projects, currentProject])

  const statusCounts = {
    backlog: issues.filter(i => i.status === 'backlog').length,
    todo: issues.filter(i => i.status === 'todo').length,
    'in-progress': issues.filter(i => i.status === 'in-progress').length,
    done: issues.filter(i => i.status === 'done').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {currentProject?.name || 'Project Board'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {currentProject?.description}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {Object.entries(statusCounts).map(([status, count]) => (
              <Badge key={status} variant="outline" className="capitalize">
                {status.replace('-', ' ')}: {count}
              </Badge>
            ))}
          </div>
          
          <Button variant="outline" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Team
          </Button>
          
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Issue
          </Button>
        </div>
      </div>

      {/* Filters */}
      <IssueFilters />

      {/* Kanban Board */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading issues...</p>
        </div>
      ) : (
        <KanbanBoard />
      )}
    </div>
  )
}