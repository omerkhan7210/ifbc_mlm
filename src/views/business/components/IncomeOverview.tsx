import classNames from '@/utils/classNames'
import { TbArrowDownToArc } from 'react-icons/tb'
import { FaSackDollar, FaCircleDollarToSlot, FaMoneyCheckDollar } from "react-icons/fa6";
import type { ReactNode } from 'react'
import { Card } from "@/components/ui"

type StatisticCardProps = {
    title: string
    icon: ReactNode
    className: string
    value: number | string
}

export type Project = {
    ongoingProject: number
    projectCompleted: number
    upcomingProject: number
}

type IncomeOverview = {
    data: Project
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
                    <h1 className="mb-1 text-gray-900">{value}</h1>
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

const IncomeOverview = () => {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <h4>Business Overview</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-2xl mt-4">
                <StatisticCard
                    title="Income"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value='$703.5k'
                    icon={<FaSackDollar />}
                />
                <StatisticCard
                    title="Bonus"
                    className="bg-emerald-100 dark:bg-opacity-75"
                    value='$1.45k'
                    icon={<FaCircleDollarToSlot />}
                />
                <StatisticCard
                    title="Paid"
                    className="bg-pink-100 dark:bg-opacity-75"
                    value='$450'
                    icon={<FaMoneyCheckDollar />}
                />
                <StatisticCard
                    title="Total Profit"
                    className="bg-emerald-200 dark:bg-opacity-75"
                    value='$32.4k'
                    icon={<TbArrowDownToArc />}
                />
            </div>
        </Card>
    )
}

export default IncomeOverview
