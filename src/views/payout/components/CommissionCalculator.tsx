import { Button, Card, Input } from '@/components/ui'
import classNames from '@/utils/classNames'
import { BsPersonArmsUp } from "react-icons/bs";
import React, { useState } from 'react'

export default function CommissionCalculator() {
    const [amount, setAmount] = useState<any>(0);
    const [commissions, setCommissions] = useState({
        first: 0,
        second: 0,
        third: 0,
        fourth: 0
    })
    const calculateCommission = () => {
        commissions.first = 15 / 100 * amount
        commissions.second = 5 / 100 * amount
        commissions.third = 3 / 100 * amount
        commissions.fourth = 2 / 100 * amount

        setCommissions(
            { ...commissions }
        )
    }

    return (
        <Card>
            <h4>Commission Calculator</h4>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className='flex  gap-5 my-5'>
                    <Input
                        placeholder='Enter Deal Amount'
                        type='number'
                        onChange={e => setAmount(e.target.value)}

                    />
                    <Button
                        variant='solid'
                        onClick={calculateCommission}
                    >Calculate</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-2xl my-3 ">
                <StatisticCard
                    title="1st  (15%)"
                    className="bg-slate-100 dark:bg-opacity-75"
                    value={commissions.first ? `$${commissions.first.toFixed(2)}` : '15%'}
                    icon={<BsPersonArmsUp />}
                />
                <StatisticCard
                    title="2nd  (5%)"
                    className="bg-slate-100 dark:bg-opacity-75"
                    value={commissions.second ? `$${commissions.second.toFixed(2)}` : '5%'}
                    icon={<BsPersonArmsUp />}
                />
                <StatisticCard
                    title="3rd  (3%)"
                    className="bg-slate-100 dark:bg-opacity-75"
                    value={commissions.third ? `$${commissions.third.toFixed(2)}` : '3%'}
                    icon={<BsPersonArmsUp />}
                />
                <StatisticCard
                    title="4th  (2%)"
                    className="bg-slate-100 dark:bg-opacity-75"
                    value={commissions.fourth ? `$${commissions.fourth.toFixed(2)}` : '2%'}
                    icon={<BsPersonArmsUp />

                    }
                />
            </div>

        </Card>
    )
}


const StatisticCard = ({
    title,
    className,
    icon,
    value,
}) => {
    return (
        <div
            className={classNames(
                'rounded-2xl p-4 flex flex-col justify-center',
                className,
            )}
        >
            <div className="flex justify-between items-center relative">
                <div>
                    <div className="mb-4 text-gray-900 font-bold">{title}</div>
                    <h3 className="mb-1 text-gray-900">{value}</h3>
                </div>
                <div
                    className={
                        'flex items-center justify-center min-h-12 min-w-12 max-h-12 max-w-12 bg-gray-900 text-white rounded-full text-2xl'
                    }
                >
                    {icon}
                </div>
            </div>
        </div>
    )
}
