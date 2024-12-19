import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import { networkRoutes } from './networkRoutes'
import { profileManagement } from './profileManagement'
import { reports } from './reports'
import { inquiriesRoutes } from './inquiriesRoutes'
import { userManagementRoutes } from './userManagementRoutes'
import {
    DEALSMANAGEMENT_PREFIX_PATH,
    INQUIRIES_PREFIX_PATH,
    TOOLS_PREFIX_PATH,
} from '@/constants/route.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/EcommerceDashboard')),
        authority: [],
    },
    {
        key: 'activity-log',
        path: `/activity-log/:id`,
        component: lazy(() => import('@/views/activityLog/ActivityLogPage')),
        authority: [],
    },

    {
        key: 'candidates',
        path: `${DEALSMANAGEMENT_PREFIX_PATH}/candidates`,
        component: lazy(() => import('@/views/candidates/Candidates')),
        authority: [],
    },
    {
        key: 'teams',
        path: `${DEALSMANAGEMENT_PREFIX_PATH}/teams`,
        component: lazy(() => import('@/views/teams/OurTeam')),
        authority: [],
    },
    {
        key: 'completedDeals',
        path: `${DEALSMANAGEMENT_PREFIX_PATH}/completed-deals`,
        component: lazy(() => import('@/views/business')),
        authority: [],
    },
    {
        key: 'teamDeals',
        path: `${DEALSMANAGEMENT_PREFIX_PATH}/team-deals`,
        component: lazy(() => import('@/views/teamDeals/TeamDeals')),
        authority: [],
    },
    {
        key: 'mailbox',
        // path: '/mailbox',
        path: `${TOOLS_PREFIX_PATH}/mailbox`,
        component: lazy(() => import('@/views/Mailbox')),
        authority: [],
    },
    {
        key: 'e-wallet',
        // path: '/e-wallet',
        path: `${TOOLS_PREFIX_PATH}/e-wallet`,
        component: lazy(() => import('@/views/eWallet')),
        authority: [],
    },
    {
        key: 'payout',
        // path: '/',
        path: `${TOOLS_PREFIX_PATH}/payout`,
        component: lazy(() => import('@/views/payout/Payout')),
        authority: [],
    },
    {
        key: 'referralLink',
        path: `${TOOLS_PREFIX_PATH}/referral-link`,
        component: lazy(() => import('@/views/settings/AllReferralLinks')),
        authority: [],
    },

    ...inquiriesRoutes,
    ...userManagementRoutes,
    ...networkRoutes,
    ...profileManagement,
    ...reports,
    ...othersRoute,
]
