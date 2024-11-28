import { Card } from '@/components/ui'
import React from 'react'

const creditData = [
    { key: 'Admin Credit', value: 300 },
    { key: 'Payout Cancelled', value: 20 },
    { key: 'E-Pin Refund', value: 0 },
    { key: 'Referral Commission', value: 4500 },
    { key: 'Level Commission', value: 540 }
]

const debitData = [
    { key: 'Fund Debit Admin', value: 28 },
    { key: 'Payout Requested', value: 200 },
    { key: 'Payout Released (Manual)', value: 400 },
    { key: 'Payout Fee', value: 150 },
    { key: 'Fund Transfer Fee', value: 28 },
    { key: 'Payout Release', value: 320 },
    { key: 'Pin Purchase', value: 0 },
    { key: 'Registration Payment', value: 0 },
]

export default function WalletSummary() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5' >

            <Card>
                <h4 className='mb-5' >Credit</h4>
                {debitData.map((item, index) => (
                    <DebitCreditCard
                        key={index}
                        label={item?.key}
                        amount={item?.value}
                    />
                ))}

            </Card>
            <Card>
                <h4 className='mb-5' >Debit</h4>
                {creditData.map((item, index) => (
                    <DebitCreditCard
                        key={index}
                        label={item?.key}
                        amount={item?.value}
                        isDebit={true}

                    />
                ))}
            </Card>
        </div>
    )
}

interface DebitCreditCardProps {
    label: string,
    amount: number | string,
    isDebit?: boolean
}

const DebitCreditCard: React.FC<DebitCreditCardProps> = ({ label, amount, isDebit }) => {
    return (
        <div className='flex justify-between items-center p-3 rounded-lg bg-slate-100 my-3'>
            <div className='text-base font-medium' >
                {label}
            </div>
            <div className={`p-2 min-w-24 font-bold rounded-md ${isDebit ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-800'}`} >
                $ {amount}
            </div>
        </div>
    )
}
