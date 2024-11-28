import React, { useState } from 'react'
import WalletOverview from './components/WalletOverview'
import { Card } from '@/components/ui'
import WalletSummary from './components/WalletSummary'
import WalletTransaction from './components/WalletTransaction'
import UserEarnings from './components/UserEarnings'

const walletTabs = ['E-Wallet Summary', 'E-Wallet Transaction', 'User Earnings']
export default function EWallet() {
    const [activeTab, setActiveTab] = useState<string>('E-Wallet Summary')

    return (
        <div className='flex flex-col gap-5'>
            <WalletOverview />
            {/* Wallet Details  */}
            <Card>
                <div className="flex flex-col gap-5">
                    {/* Navigation */}
                    <div className='flex gap-5 mb-5'>
                        {walletTabs.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => setActiveTab(item)}
                                    className={`text-base p-2 cursor-pointer select-none ${activeTab === item && 'font-semibold border-b-4  border-black border-solid'}`}
                                >
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                    {/* Content  */}
                    {activeTab === 'E-Wallet Summary' && <WalletSummary />}
                    {activeTab === 'E-Wallet Transaction' && <WalletTransaction />}
                    {activeTab === 'User Earnings' && <UserEarnings />}

                </div>



            </Card>

        </div>
    )
}
