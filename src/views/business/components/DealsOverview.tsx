import classNames from '@/utils/classNames'
import { TbArrowDownToArc } from 'react-icons/tb'
import { FaSackDollar, FaCircleDollarToSlot, FaMoneyCheckDollar } from "react-icons/fa6";
import { useEffect, useState, type ReactNode } from 'react'
import { Card } from "@/components/ui"
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { GrInProgress } from "react-icons/gr";
import { BsMicrosoftTeams } from "react-icons/bs";
import { GoIssueReopened } from "react-icons/go";
import { getData } from '@/services/axios/axiosUtils';
import { useAuth } from '@/auth';


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



const DealsOverview = () => {
    const { user } = useAuth();
    const [allDeals, setAllDeals] = useState(0);
    const [completedDeals, setCompletedDeals] = useState(0);
    const [inProgressDeals, setInProgressDeals] = useState(0);
    const [childDeals, setChildDeals] = useState(0);


    useEffect(() => {

        getData(`commissions/consultant/${user?.userId}/all-deals`).then((response) => {
            setAllDeals(response.inProgressDeals);
        }).catch(err => console.log(err))

        getData(`commissions/consultant/${user?.userId}/completed-deals`).then((response) => {
            setCompletedDeals(response.totalCompletedDeals);
        }).catch(err => console.log(err))

        getData(`commissions/consultant/${user?.userId}/inprogress-deals`).then((response) => {
            setInProgressDeals(response.inProgressDeals);
        }).catch(err => console.log(err))

        getData(`commissions/consultant/${user?.userId}/all-child-deals`).then((response) => {
            setChildDeals(response.childDeals);
        }).catch(err => console.log(err))


    }, [])


    return (
        <Card >
            <div className="flex items-center justify-between mb-5">
                <h4>Business Overview</h4>
            </div>
            <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4  gap-4 rounded-2xl mt-4">
                <StatisticCard
                    title="All Deals"
                    className="bg-sky-100 dark:bg-opacity-75"
                    value={allDeals}
                    icon={<GrInProgress />}
                />
                <StatisticCard
                    title="In Progress Deals"
                    className="bg-red-100 dark:bg-opacity-75"
                    value={inProgressDeals || allDeals - completedDeals}
                    icon={<GoIssueReopened />}
                />
                <StatisticCard
                    title="Closed Deals"
                    className="bg-emerald-100 dark:bg-opacity-75"
                    value={completedDeals}
                    icon={<IoCheckmarkDoneCircle />}
                />
                <StatisticCard
                    title="Sub Consultant's Deals"
                    className="bg-slate-100 dark:bg-opacity-75"
                    value={childDeals}
                    icon={<IoCheckmarkDoneCircle />}
                />
            </div>
        </Card>
    )
}

export default DealsOverview

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