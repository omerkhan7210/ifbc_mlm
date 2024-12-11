import React from 'react'
import DealsOverview from './components/DealsOverview';
import MonthlyDealsChart from './components/MonthlyDealsChart';
import DealsCommissionDetails from './components/DealsCommissionDetails';
const Business = () => {
    return <div className='flex flex-col  gap-5'>

        <DealsCommissionDetails />

        {/* <div className='w-full md:w-3/5'>
                <MonthlyDealsChart />
            </div> */}

        {/* <Card>
            <h2 className='mb-12'>Activity Log </h2>
            <ActivityLog
                activities={activities}
            />

        </Card> */}

    </div>
}

export default Business
