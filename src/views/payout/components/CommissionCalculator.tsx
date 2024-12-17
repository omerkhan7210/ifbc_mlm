import { Button, Card, Checkbox, Input } from '@/components/ui'
import classNames from '@/utils/classNames'
import { BsPersonArmsUp } from "react-icons/bs";
import React, { useEffect, useState } from 'react'
import { getData } from '@/services/axios/axiosUtils';

export default function CommissionCalculator() {
    const [amount, setAmount] = useState<any>(0);
    const [isAmbassadorIncluded, setIsAmbassadorIncluded] = useState(false);


    const [shares, setShares] = useState<any>({
        consultantShare: 15,
        seniorConsultantShare: 5,
        brokerShare: 3,
        managingBrokerShare: 2,
        ambassadorAmount: 1500,
    });
    const [commissions, setCommissions] = useState({
        consultant: 0,
        seniorConsultant: 0,
        broker: 0,
        managingBroker: 0,
        ambassador: 0
    })

    const calculateCommission = () => {
        const { consultantShare, seniorConsultantShare, brokerShare } = shares
        if (isAmbassadorIncluded) {
            commissions.consultant = (consultantShare / 100 * amount) - shares.ambassadorAmount;
        } else {
            commissions.consultant = consultantShare / 100 * amount
        }
        commissions.seniorConsultant = seniorConsultantShare / 100 * amount
        commissions.broker = brokerShare / 100 * amount
        commissions.managingBroker = shares.managingBrokerShare / 100 * amount

        setCommissions(
            { ...commissions }
        )
        // setAmount('')
    }

    // Handler function to toggle the checkbox state
    const handleCheckboxChange = (isChecked: boolean): void => {
        setIsAmbassadorIncluded(isChecked);
    };

    useEffect(() => {
        getData('consultantshares/2').then((response) => {
            console.log(response)
            setShares(response)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <main className="grid grid-cols-12 gap-5 my-4">
                <section className=" md:col-span-6 max-md:col-span-12 w-full h-full ">
                    <Card className='h-full'>
                        <h4>Commission Calculator</h4>
                        <div className="grid grid-cols-1 md:grid-cols-1 mb-5">
                            <div className='flex items-center  gap-5 my-5  '>
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
                            <Checkbox
                                name="Include Ambassador Amount"
                                onChange={(isChecked) => handleCheckboxChange(isChecked)}
                                style={{ transform: 'scale(0.8)' }}
                            >
                                Include Ambassador
                            </Checkbox>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl my-3 ">
                            <StatisticCard
                                title={`Franchise Consultant (${shares?.consultantShare || 0}%)`}
                                className="bg-slate-100 dark:bg-opacity-75"
                                value={commissions.consultant ? `$${commissions.consultant.toFixed(2)}` : `${shares?.consultantShare || 0}%`}
                                icon={<BsPersonArmsUp />}
                            />
                            <StatisticCard
                                title={`Senior Franchise Consultant (${shares?.seniorConsultantShare || 0}%)`}
                                className="bg-slate-100 dark:bg-opacity-75"
                                value={commissions.seniorConsultant ? `$${commissions.seniorConsultant.toFixed(2)}` : `${shares?.seniorConsultantShare || 0}%`}
                                icon={<BsPersonArmsUp />}
                            />
                            <StatisticCard
                                title={`Franchise Broker (${shares?.brokerShare || 0}%)`}
                                className="bg-slate-100 dark:bg-opacity-75"
                                value={commissions?.broker ? `$${commissions?.broker.toFixed(2)}` : `${shares?.brokerShare || 0}%`}
                                icon={<BsPersonArmsUp />}
                            />
                            <StatisticCard
                                title={`Managing Broker (${shares?.managingBrokerShare || 0}%)`}
                                className="bg-slate-100 dark:bg-opacity-75"
                                value={commissions?.managingBroker ? `$${commissions?.managingBroker.toFixed(2)}` : `${shares?.managingBrokerShare || 0}%`}
                                icon={<BsPersonArmsUp />}
                            />
                            {isAmbassadorIncluded && <StatisticCard
                                title={`Ambassador Amount`}
                                className="bg-slate-100 dark:bg-opacity-75"
                                value={`$${shares?.ambassadorAmount || 0}`}
                                icon={<BsPersonArmsUp />}
                            />}
                        </div>
                    </Card>
                </section>
                <section className="md:col-span-6 max-md:col-span-12 h-full">
                    <Card className='h-full'>
                        <HintOptions shares={shares} />
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
            <div className=" relative">
                <div>
                    <div className="mb-4 text-gray-900 font-bold">{title}</div>
                </div>
                <div className='flex justify-between items-center'>
                    <h6 className="mb-1 text-green-700 text-semibold">{value}</h6>
                    <div
                        className={
                            'flex items-center justify-center min-h-8 min-w-8 max-h-8 max-w-8 bg-gray-900 text-white rounded-full text-1xl'
                        }
                    >
                        {icon}
                    </div>
                </div>

            </div>
        </div>
    )
}


const HintOptions = ({ shares }) => {
    return (
        <div className="">
            {/* <h2 className="text-base font-bold text-blue-700 mb-1 mb-2">Hints</h2> */}
            <div className="text-xs xl:text-sm text-gray-700 space-y-3">
                <div>
                    <p className="font-bold text-blue-700 mb-1">Tier 1: Franchise Consultant</p>
                    <p><strong>Requirements:</strong> Join the IFBC Network and sell franchises directly.</p>
                    <p><strong>Earnings:</strong> {shares.consultantShare}% commission on direct franchise sales.</p>
                    <p><strong>Key Benefits:</strong> Entry-level role focused on personal sales.</p>
                </div>
                <div>
                    <p className="font-bold text-blue-700 mb-1">Tier 2: Senior Franchise Consultant</p>
                    <p><strong>Requirements:</strong> Build a team of 5 Franchise Consultants and achieve 1 direct franchise sale.</p>
                    <p><strong>Earnings:</strong> {shares.consultantShare}% commission on direct sales and {shares.seniorConsultantShare}% residual commission on team sales.</p>
                    <p><strong>Key Benefits:</strong> Unlock the power of team-based residual income.</p>
                </div>
                <div>
                    <p className="font-bold text-blue-700 mb-1">Tier 3: Franchise Broker</p>
                    <p><strong>Requirements:</strong> Grow a team of 25 Franchise Consultants, achieve 3 direct sales or 10 team sales, and promote 1 team member to Senior Franchise Consultant.</p>
                    <p><strong>Earnings:</strong> {shares.consultantShare}% commission on direct sales, {shares.seniorConsultantShare}% residual commission from Level 2 team, and {shares.brokerShare}% residual commission from the extended team (Level 3).</p>
                    <p><strong>Key Benefits:</strong> Develop leadership skills and mentor future leaders.</p>
                </div>
                <div>
                    <p className="font-bold text-blue-700 mb-1">Tier 4: Managing Broker</p>
                    <p><strong>Requirements:</strong> Build a team of 125 Franchise Consultants, achieve 5 direct sales or 20 team sales, and promote 1 team member to Franchise Broker.</p>
                    <p><strong>Earnings:</strong> {shares.consultantShare}% commission on direct sales, {shares.seniorConsultantShare}% residual commission from Level 2 team, {shares.brokerShare}% residual commission from Level 3 team, and {shares.managingBrokerShare}% residual commission from subordinate levels.</p>
                    <p><strong>Key Benefits:</strong> Lead a thriving network, secure long-term residual income, and explore team management opportunities.</p>
                </div>
            </div>

        </div>
    );
};