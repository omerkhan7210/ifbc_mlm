import React from 'react'
import CommissionCalculator from './components/CommissionCalculator'
import CommissionTransactions from './components/CommissionTransactions'

const Payout = () => {
    return <div className='flex flex-col gap-5'>
        <CommissionCalculator />
        <CommissionTransactions />
    </div>
}

export default Payout
