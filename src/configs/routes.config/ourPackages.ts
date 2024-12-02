import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { PACKAGE_PREFIX_PATH } from '@/constants/route.constant'

export const ourPackages: Routes = [
    {
        key: 'ourPackages',
        path: `${PACKAGE_PREFIX_PATH}/member-ship`,
        component: lazy(() => import('@/views/ourPackages/MemberShip')),
        authority: [],
    },
]
