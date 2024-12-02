import { Input } from '@/components/ui'
import React from 'react'
import ProfilePicture from '../../../public/images/logo/IFBC 1.png'
import DownlineMembersTable from '../EcommerceDashboard/components/DownlineMembersTable'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'

const TotalBonus = () => {
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
    const headerConfig = {
        title: 'Inbox',
        buttonText: 'Create Excel',
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
                <div className="flex justify-between items-center mb-[1rem] bg-white py-[1rem] px-[0.5rem] rounded-xl shadow">
                    <div>
                        <label>UserName</label>
                        <select
                            className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            // value={formFields.userType}
                            // onChange={(e) =>
                            //     setFormFields({
                            //         ...formFields,
                            //         userType: e.target.value,
                            //     })
                            // }
                        >
                            <option value="" disabled>
                                Select User Type
                            </option>
                            <option value="C">Consultant</option>
                            <option value="A">Ambassador</option>
                        </select>
                    </div>
                    <div>
                        <label>UserName</label>
                        <select
                            className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                            // value={formFields.userType}
                            // onChange={(e) =>
                            //     setFormFields({
                            //         ...formFields,
                            //         userType: e.target.value,
                            //     })
                            // }
                        >
                            <option value="" disabled>
                                Select User Type
                            </option>
                            <option value="C">Consultant</option>
                            <option value="A">Ambassador</option>
                        </select>
                    </div>
                    <div className="flex gap-2 flex-col">
                        <button
                            type="button"
                            // onClick={handleSendOtp}
                            className="py-2.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            // onClick={handleSendOtp}
                            className="py-2.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        >
                            Reset
                        </button>
                    </div>
                </div>
                {/* <div> */}
                <div className="flex justify-between mb-[1rem] bg-white py-[1rem] px-[0.5rem] rounded-xl shadow">
                    <div className="flex flex-col gap-[0.3rem]">
                        <h1 className="text-black ">Company name</h1>
                        <p className="text-black text-[1rem]">company address</p>
                        <p className="text-black text-[1rem]">Phone : 123456789</p>
                        <p className="text-black text-[1rem]">
                            E-mail : company@company.com
                        </p>
                    </div>
                    <div className="w-[40%] object-contain">
                        <img src={ProfilePicture} alt="ProfilePicture" />
                    </div>
                </div>

                <div>
                    <DownlineMembersTable
                        data={treeViewData}
                        headerConfig={headerConfig}
                    />
                </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default TotalBonus
