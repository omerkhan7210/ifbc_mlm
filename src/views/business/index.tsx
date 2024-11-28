import React from 'react'

import IncomeOverview from './components/IncomeOverview';
import IncomeDonutChart from './components/IncomeDonutChart';
import MonthlyIncome from './components/MonthlyIncomeChart';

const Business = () => {
    return <div className='flex flex-col gap-5'>
        <IncomeOverview />
        <div
            className='grid grid-cols-1 md:grid-cols-2 gap-5'
        >
            <IncomeDonutChart />
            <MonthlyIncome />
        </div>

    </div>
}

export default Business
