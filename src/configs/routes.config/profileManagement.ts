import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { PROFILEMANAGEMENT_PREFIX_PATH } from '@/constants/route.constant'

export const profileManagement: Routes = [
    {
        key: 'profilemanagement',
        path: `${PROFILEMANAGEMENT_PREFIX_PATH}/profile-view`,
        component: lazy(() => import('@/views/profileManagement/ProfileView')),
        authority: [],
    },
    {
        key: 'profilemanagement',
        path: `${PROFILEMANAGEMENT_PREFIX_PATH}/member-list`,
        component: lazy(() => import('@/views/networks/TreeView')),
        authority: [],
    },
    {
        key: 'profilemanagement',
        path: `${PROFILEMANAGEMENT_PREFIX_PATH}/kyc-details`,
        component: lazy(() => import('@/views/networks/DownlineMembers')),
        authority: [],
    },
]
