import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { USER_MANAGeMENT_PREFIX_PATH } from '@/constants/route.constant'

export const userManagementRoutes: Routes = [
    {
        key: 'members',
        path: `${USER_MANAGeMENT_PREFIX_PATH}/members`,
        component: lazy(() => import('@/views/userManagement/members')),
        authority: [],
    },
    {
        key: 'registeruser',
        path: `${USER_MANAGeMENT_PREFIX_PATH}/registeruser`,
        component: lazy(() => import('@/views/userManagement/RegisterUser')),
        authority: [],
    },
    {
        key: 'consultantregister',
        path: `${USER_MANAGeMENT_PREFIX_PATH}/consultantregister`,
        component: lazy(
            () => import('@/views/userManagement/ConsultantRegister'),
        ),
        authority: [],
    },
]
