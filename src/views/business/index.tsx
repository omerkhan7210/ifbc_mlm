import React from 'react'

import IncomeDonutChart from './components/IncomeDonutChart';
import MonthlyDealsChart from './components/MonthlyDealsChart';
import TransactionsTable from './components/TransactionsTable';
import { Card, Notification } from '@/components/ui';
import DealsOverview from './components/DealsOverview';
import ActivityLog from '@/components/ActivityLog';
import activities from './data/Activities.json'

const Business = () => {
    return <div className='flex flex-col  gap-5'>
        <div className='w-full flex-col  md:flex-row md:items-stretch flex gap-5'>
            <div className='w-full md:w-2/5'>
                <DealsOverview className='h-full' />
            </div>
            <div className='w-full md:w-3/5'>
                <MonthlyDealsChart />
            </div>
        </div>

        <Card>
            <h2 className='mb-12'>Activity Log </h2>
            <ActivityLog
                activities={activities}
            />

        </Card>

    </div>
}

export default Business
