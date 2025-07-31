'use client'

import { useState, useEffect } from 'react'
import { useUser, useOrganization } from '@clerk/nextjs'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { useAppDispatch } from '@/store'
import { setUser, setOrganization } from '@/features/auth/authSlice'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user } = useUser()
  const { organization } = useOrganization()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      dispatch(setUser({
        id: user.id,
        name: user.fullName || user.emailAddresses[0]?.emailAddress || '',
        email: user.emailAddresses[0]?.emailAddress || '',
        avatar: user.imageUrl,
        organizationId: organization?.id,
      }))
    }
    
    if (organization) {
      dispatch(setOrganization(organization.id))
    }
  }, [user, organization, dispatch])

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}