import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { TOOLS_PREFIX_PATH } from '@/constants/route.constant'

export const tools: Routes = [
    {
        key: 'metarials',
        path: `${TOOLS_PREFIX_PATH}/news`,
        component: lazy(() => import('@/views/tools/News')),
        authority: [],
    },
    {
        key: 'metarials',
        path: `${TOOLS_PREFIX_PATH}/uploaded-metarials`,
        component: lazy(() => import('@/views/tools/UploadedMetarials')),
        authority: [],
    },
]
