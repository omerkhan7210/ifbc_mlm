import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import { networkRoutes } from './networkRoutes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/EcommerceDashboard')),
        authority: [],
    },
    {
        key: 'epin',
        path: '/e-pin',
        component: lazy(() => import('@/views/EPin')),
        authority: [],
    },
    {
        key: 'ewallet',
        path: '/e-wallet',
        component: lazy(() => import('@/views/eWallet')),
        authority: [],
    },
    {
        key: 'business',
        path: '/business',
        component: lazy(() => import('@/views/business')),
        authority: [],
    },
    {
        key: 'mailbox',
        path: '/mailbox',
        component: lazy(() => import('@/views/Mailbox')),
        authority: [],
    },
    {
        key: 'payout',
        path: '/payout',
        component: lazy(() => import('@/views/Payout')),
        authority: [],
    },
    ...networkRoutes,
    ...othersRoute,
]
