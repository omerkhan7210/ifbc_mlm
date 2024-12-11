import { Button, Card, Input } from '@/components/ui'
import classNames from '@/utils/classNames'
import { BsPersonArmsUp } from "react-icons/bs";
import React, { useEffect, useState } from 'react'
import { getData } from '@/services/axios/axiosUtils';

export default function CommissionCalculator() {
    const [amount, setAmount] = useState<any>(0);
    const [shares, setShares] = useState<any>({
        consultantShare: 0,
        seniorConsultantShare: 0,
        brokerShare: 0,
        ambassadorAmount: 0,
    });
    const [commissions, setCommissions] = useState({
        consultant: 0,
        seniorConsultant: 0,
        broker: 0,
        ambassador: 0
    })
    const calculateCommission = () => {
        const { consultantShare, seniorConsultantShare, brokerShare } = shares
        commissions.consultant = consultantShare / 100 * amount
        commissions.seniorConsultant = seniorConsultantShare / 100 * amount
        commissions.broker = brokerShare / 100 * amount

        setCommissions(
            { ...commissions }
        )
        // setAmount('')
    }

    useEffect(() => {
        getData('consultantshares/1').then((response) => {
            console.log(response)
            setShares(response)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <main className="grid grid-cols-12 gap-5 my-4">
                <section className="md:col-span-4 max-md:col-span-12">
                    <Card>
                        <HintOptions shares={shares} />

                    </Card>
                </section>
                <section className=" md:col-span-8 max-md:col-span-12 w-full ">
                    <Card>
                        <h4>Commission Calculator</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className='flex  gap-5 my-5'>
                                <Input
                                    placeholder='Enter Franchise Amount'
                                    type='number'
                                    onChange={e => setAmount(e.target.value)}
                                // value={amount}
                                />
                                <Button
                                    variant='solid'
                                    onClick={calculateCommission}
                                >Calculate</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl my-3 ">
                            <StatisticCard
                                title={`Consultant (${shares?.consultantShare}%)`}
                                className="bg-slate-100 dark:bg-opacity-75"
                                value={commissions.consultant ? `$${commissions.consultant.toFixed(2)}` : `${shares?.consultantShare}%`}
                                icon={<BsPersonArmsUp />}
                            />
                            <StatisticCard
                                title={`Senior Consultant (${shares?.seniorConsultantShare}%)`}
                                className="bg-slate-100 dark:bg-opacity-75"
                                value={commissions.seniorConsultant ? `$${commissions.seniorConsultant.toFixed(2)}` : `${shares?.seniorConsultantShare}%`}
                                icon={<BsPersonArmsUp />}
                            />
                            <StatisticCard
                                title="Franchise Broker (2%)"
                                className="bg-slate-100 dark:bg-opacity-75"
                                value={commissions?.broker ? `$${commissions?.broker.toFixed(2)}` : `${shares?.brokerShare}%`}
                                icon={<BsPersonArmsUp />}
                            />
                        </div>
                    </Card>
                </section>
            </main>
        </>
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


const HintOptions = ({ shares }) => {
    return (
        <div className="">
            <h2 className="text-base font-bold text-blue-800 mb-2">Hints</h2>
            <ul className="text-sm text-gray-600 flex flex-col gap-5">
                <li>
                    <strong>Franchise Consultant:</strong> Earns {shares.consultantShare}% of the franchise fee for every successful franchise deal they facilitate.
                </li>
                <li>
                    <strong>Senior Franchise Consultant:</strong> After recruiting 5 franchise consultants or successfully referring 5 franchises, earns an additional {shares.seniorConsultantShare}% from their team's earnings while their team retains the standard 15% share.
                </li>
                <li>
                    <strong>Franchise Broker:</strong> After referring 25 franchises or recruiting 25 consultants, earns an additional {shares.brokerShare}% of their team's earnings while their team retains their respective shares (15% and 5%).
                </li>
                <li>
                    <strong>Ambassador:</strong> Receives ${shares.ambassadorAmount} per successful referral resulting in a franchise purchase.
                </li>
            </ul>
        </div>
    );
};