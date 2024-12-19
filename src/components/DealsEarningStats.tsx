import classNames from '@/utils/classNames'
import { TbArrowDownToArc } from 'react-icons/tb'
import {
    FaSackDollar,
    FaCircleDollarToSlot,
    FaRegFaceSmile
} from 'react-icons/fa6'
import type { ReactNode } from 'react'
import { Card, Skeleton } from '@/components/ui'


type DealsEarningStatsProps = {
    totalAmount: number
    totalCompletedDeals: number
    totalCommission: number
}

const DealsEarningStats = ({
    totalAmount,
    totalCompletedDeals,
    totalCommission,
}: DealsEarningStatsProps) => {
    return (
        <Card>
            <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-2 gap-4 rounded-2xl">
                <StatisticCard
                    title="Total Completed Deals"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={totalCompletedDeals}
                    icon={<FaRegFaceSmile />}
                />
                <StatisticCard
                    title="Commission Earned"
                    className="bg-emerald-100 dark:bg-opacity-75"
                    value={totalAmount ? ('$ ' + totalAmount.toLocaleString('eng-us', { minimumFractionDigits: 0, maximumFractionDigits: 2 })) : 0}
                    icon={<FaCircleDollarToSlot />}
                />

            </div>
        </Card>
    )
}

export default DealsEarningStats;

type StatisticCardProps = {
    title: string
    icon: ReactNode
    className: string
    value: number | string
}

const StatisticCard = ({
    title,
    className,
    icon,
    value,
}: StatisticCardProps) => {
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
                    {value ? <h3 className="mb-1 text-gray-900">{value}</h3> :
                        <Skeleton className='w-8 h-8' />
                    }
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
