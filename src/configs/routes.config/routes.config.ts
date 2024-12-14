import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import { networkRoutes } from './networkRoutes'
import { profileManagement } from './profileManagement'
import { reports } from './reports'
import { inquiriesRoutes } from './inquiriesRoutes'
import { userManagementRoutes } from './userManagementRoutes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/EcommerceDashboard')),
        authority: [],
    },

    {
        key: 'cadidates',
        path: '/candidates',
        component: lazy(() => import('@/views/candidates/Candidates')),
        authority: [],
    },
    {
        key: 'teams',
        path: '/teams',
        component: lazy(() => import('@/views/teams/OurTeam')),
        authority: [],
    },
    {
        key: 'completedDeals',
        path: '/completed-deals',
        component: lazy(() => import('@/views/business')),
        authority: [],
    },
    {
        key: 'teamDeals',
        path: '/team-deals',
        component: lazy(() => import('@/views/teamDeals/TeamDeals')),
        authority: [],
    },
    {
        key: 'mailbox',
        path: '/mailbox',
        component: lazy(() => import('@/views/Mailbox')),
        authority: [],
    },
    {
        key: 'ewallet',
        path: '/e-wallet',
        component: lazy(() => import('@/views/eWallet')),
        authority: [],
    },
    {
        key: 'payout',
        path: '/payout',
        component: lazy(() => import('@/views/payout/Payout')),
        authority: [],
    },

    ...inquiriesRoutes,
    ...userManagementRoutes,
    ...networkRoutes,
    ...profileManagement,
    ...reports,
    ...othersRoute,
]
