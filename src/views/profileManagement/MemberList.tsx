import React from 'react'
import DownlineMembersTable from '../EcommerceDashboard/components/DownlineMembersTable'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'
import { FaUsersLine, FaUsersRays, FaUserPlus } from 'react-icons/fa6'
import { HiDotsVertical } from 'react-icons/hi'

const MemberList = () => {
    const treeViewData = [
        {
            id: 1,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
        },
        {
            id: 2,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
        },
        {
            id: 3,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '3',
        },
        {
            id: 4,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
        },
        {
            id: 5,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
        },
        {
            id: 6,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '2',
        },
        {
            id: 7,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
        },
        {
            id: 8,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
        },
        {
            id: 9,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '1',
        },
        {
            id: 10,
            profile: profileImage,
            tittle: 'INF00123',
            name: 'Sagar uphade',
            level: '3',
        },
    ]

    const recentlyUser = [
        {
            tittle: 'Total Joinings',
            users: '302',
        },
        {
            tittle: 'Month Joinings',
            users: '30',
        },
        { tittle: 'Today Joinings', users: '3' },
    ]

    const headerConfig = {
        title: 'Inbox',
        buttonText: 'New email',
        placeholderText: 'Search User',
        buttonAction: () => {
            // setShowEmailModel(true)
            console.log('Navigate to details')
        },
        onchangeAction: () => {
            // setShowEmailModel(true)
            console.log('Onchange details')
        },
    }
    return (
        <>
            <div>
                <div className="flex justify-between items-start mb-[1rem]">
                    {recentlyUser?.map((item, key) => (
                        <div
                            className="max-w-[32%] bg-white py-[1rem] px-[0.5rem] w-[32%] rounded-xl flex items-center gap-[1rem] shadow relative"
                            key={key}
                        >
                            <HiDotsVertical
                                size={24}
                                className="absolute top-2 right-1 text-black"
                            />
                            {item?.tittle === 'Total Joinings' ? (
                                <FaUsersRays
                                    size={50}
                                    className="bg-[gray] rounded-full p-[0.3rem] text-[white]"
                                />
                            ) : item?.tittle === 'Month Joinings' ? (
                                <FaUsersLine
                                    size={50}
                                    className="bg-[gray] rounded-full p-[0.3rem] text-[white]"
                                />
                            ) : item?.tittle === 'Today Joinings' ? (
                                <FaUsersRays
                                    size={50}
                                    className="bg-[gray] rounded-full p-[0.3rem] text-[white]"
                                />
                            ) : null}

                            <span>
                                <p>{item?.tittle}</p>
                                <h1>{item?.users}</h1>
                            </span>
                        </div>
                    ))}

                </div>
                <DownlineMembersTable
                    data={treeViewData}
                    headerConfig={headerConfig}
                />
            </div>
        </>
    )
}

export default MemberList
