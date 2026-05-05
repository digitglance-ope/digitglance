'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export type UserRole = 'owner' | 'admin' | 'manager' | 'staff' | 'viewer'

export interface RolePermissions {
  role: UserRole
  isOwner: boolean
  loading: boolean
  canCreate: boolean   // create invoices, customers, etc.
  canEdit: boolean     // edit invoices, customers, etc.
  canDelete: boolean   // delete records
  canManageUsers: boolean   // access Team page, invite/remove users
  canManageBilling: boolean // access Subscription page
  canViewReports: boolean   // access Reports page
}

export function useRole(): RolePermissions {
  const supabase = createClient()
  const [role, setRole]       = useState<UserRole>('owner')
  const [isOwner, setIsOwner] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_team_member, account_owner_id')
        .eq('id', user.id)
        .single()

      if (!profile?.is_team_member || !profile.account_owner_id) {
        setRole('owner')
        setIsOwner(true)
        setLoading(false)
        return
      }

      const { data: membership } = await supabase
        .from('account_users')
        .select('role')
        .eq('user_id', user.id)
        .eq('account_owner_id', profile.account_owner_id)
        .maybeSingle()

      setRole((membership?.role ?? 'viewer') as UserRole)
      setIsOwner(false)
      setLoading(false)
    }
    load()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const canCreate       = ['owner', 'admin', 'manager', 'staff'].includes(role)
  const canEdit         = ['owner', 'admin', 'manager'].includes(role)
  const canDelete       = ['owner', 'admin'].includes(role)
  const canManageUsers  = ['owner', 'admin'].includes(role)
  const canManageBilling = isOwner
  const canViewReports  = ['owner', 'admin', 'manager'].includes(role)

  return { role, isOwner, loading, canCreate, canEdit, canDelete, canManageUsers, canManageBilling, canViewReports }
}
