import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { INQUIRIES_PREFIX_PATH } from '@/constants/route.constant'

export const inquiriesRoutes: Routes = [
    {
        key: 'franchise-inquiries',
        path: `${INQUIRIES_PREFIX_PATH}/franchise-inquiries`,
        component: lazy(() => import('@/views/inquiries/franchiseInquiries')),
        authority: [],
    },
    {
        key: 'become-consultant',
        path: `${INQUIRIES_PREFIX_PATH}/become-consultant`,
        component: lazy(() => import('@/views/inquiries/becomeConsultant')),
        authority: [],
    },
    {
        key: 'contact-us',
        path: `${INQUIRIES_PREFIX_PATH}/contact-us`,
        component: lazy(() => import('@/views/inquiries/contactUs')),
        authority: [],
    },
    {
        key: 'franchise-your-business',
        path: `${INQUIRIES_PREFIX_PATH}/franchise-your-business`,
        component: lazy(
            () => import('@/views/inquiries/franchiseYourBusiness'),
        ),
        authority: [],
    },
    {
        key: 'funding-calculator',
        path: `${INQUIRIES_PREFIX_PATH}/funding-calculator`,
        component: lazy(() => import('@/views/inquiries/fundingCalculator')),
        authority: [],
    },
    {
        key: 'help-request',
        path: `${INQUIRIES_PREFIX_PATH}/help-request`,
        component: lazy(() => import('@/views/inquiries/helpRequest')),
        authority: [],
    },
]
