import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { SETTINGS_PREFIX_PATH } from '@/constants/route.constant'

export const settings: Routes = [
    {
        key: 'settings',
        path: `${SETTINGS_PREFIX_PATH}/company-profile`,
        component: lazy(() => import('@/views/settings/CompanyProfile')),
        authority: [],
    },
    {
        key: 'settings',
        path: `${SETTINGS_PREFIX_PATH}/commission-settings`,
        component: lazy(() => import('@/views/settings/CommissionSetting')),
        authority: [],
    },
    {
        key: 'settings',
        path: `${SETTINGS_PREFIX_PATH}/referral-link`,
        component: lazy(() => import('@/views/settings/AllReferralLinks')),
        authority: [],
    },
]
