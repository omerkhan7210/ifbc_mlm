import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { REPORTS_PREFIX_PATH } from '@/constants/route.constant'

export const reports: Routes = [
    // {
    //     key: 'commission',
    //     path: `${REPORTS_PREFIX_PATH}/Profile`,
    //     component: lazy(() => import('@/views/reports/Profile')),
    //     authority: [],
    // },
    // {
    //     key: 'totalBonus',
    //     path: `${REPORTS_PREFIX_PATH}/avtivate`,
    //     component: lazy(() => import('@/views/reports/ActivateAndDeactivate')),
    //     authority: [],
    // },
    // {
    //     key: 'totalEarners',
    //     path: `${REPORTS_PREFIX_PATH}/joinings`,
    //     component: lazy(() => import('@/views/reports/Joinings')),
    //     authority: [],
    // },
    {
        key: 'commission',
        path: `${REPORTS_PREFIX_PATH}/commission`,
        component: lazy(() => import('@/views/reports/Commission')),
        authority: [],
    },
    {
        key: 'totalBonus',
        path: `${REPORTS_PREFIX_PATH}/total-bonus`,
        component: lazy(() => import('@/views/reports/TotalBonus')),
        authority: [],
    },
    {
        key: 'totalEarners',
        path: `${REPORTS_PREFIX_PATH}/total-earnings`,
        component: lazy(() => import('@/views/reports/TotalEarnings')),
        authority: [],
    },
    {
        key: 'subscriptionreport',
        path: `${REPORTS_PREFIX_PATH}/payout`,
        component: lazy(() => import('@/views/reports/Payout')),
        authority: [],
    },
]
