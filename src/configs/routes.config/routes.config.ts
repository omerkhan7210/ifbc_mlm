import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'
import { networkRoutes } from './networkRoutes'
import { profileManagement } from './profileManagement'
import { reports } from './reports'
import { ourPackages } from './ourPackages'
import { tools } from './tools'
import { settings } from './settings'

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
        key: 'cadidates',
        path: '/candidates',
        component: lazy(() => import('@/views/candidates/Candidates')),
        authority: [],
    },
    {
        key: 'franchise-inquiries',
        path: '/franchise-inquiries',
        component: lazy(() => import('@/views/franchiseInquiries/FranchiseInquiries')),
        authority: [],
    },
    {
        key: 'become-consultant',
        path: '/become-consultant',
        component: lazy(() => import('@/views/becomeConsultant/BecomeConsultant')),
        authority: [],
    },
    {
        key: 'contact-us',
        path: '/contact-us',
        component: lazy(() => import('@/views/contactUs/ContactUs')),
        authority: [],
    },
    {
        key: 'franchise-your-business',
        path: '/franchise-your-business',
        component: lazy(() => import('@/views/franchiseYourBusiness/FranchiseYourBusiness')),
        authority: [],
    },
    {
        key: 'funding-calculator',
        path: '/funding-calculator',
        component: lazy(() => import('@/views/fundingCalculator/FundingCalculator')),
        authority: [],
    },
    {
        key: 'help-request',
        path: '/help-request',
        component: lazy(() => import('@/views/helpRequest/HelpRequest')),
        authority: [],
    },
    {
        key: 'teams',
        path: '/teams',
        component: lazy(() => import('@/views/teams/OurTeam')),
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
        component: lazy(() => import('@/views/payout/Payout')),
        authority: [],
    },

    ...networkRoutes,
    ...profileManagement,
    ...ourPackages,
    ...reports,
    ...tools,
    ...settings,
    ...othersRoute,
]
