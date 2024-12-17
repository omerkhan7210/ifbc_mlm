import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { NETWORKS_PREFIX_PATH } from '@/constants/route.constant'

export const networkRoutes: Routes = [
    {
        key: 'genealogyTree',
        path: `${NETWORKS_PREFIX_PATH}/genealogy-tree`,
        component: lazy(() => import('@/views/networks/GenealogyTree')),
        authority: [],
    },
    {
        key: 'geneolagyTree',
        path: `${NETWORKS_PREFIX_PATH}/tree-view`,
        component: lazy(() => import('@/views/networks/TreeView')),
        authority: [],
    },
    {
        key: 'downlineMembers',
        path: `${NETWORKS_PREFIX_PATH}/downline-members`,
        component: lazy(() => import('@/views/networks/DownlineMembers')),
        authority: [],
    },
]
