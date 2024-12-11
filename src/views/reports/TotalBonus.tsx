import { Input } from '@/components/ui'
import React, { useState } from 'react'
import ProfilePicture from '../../../public/images/logo/IFBC 1.png'
import DownlineMembersTable from '../EcommerceDashboard/components/DownlineMembersTable'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'

const TotalBonus = () => {
    // const [searchQuery, setSearchQuery] = useState('')
    const filteredCandidates = [
        {
            additionalEmail: '',
            additionalFirstName: '',
            additionalLastName: '',
            additionalPhone: '',
            additionalRelationship: '',
            agentUserId: 8,
            currentCity: 'amherst junction',
            currentState: 'wisconsin',
            currentZipcode: '12345-rtr',
            docDate: '2024-12-06T13:55:56.327',
            docid: 429,
            email: 'odoobasit+test023@gmail.com',
            firstName: 'abid',
            franchiseInterested: '[9]',
            isArchive: false,
            isCompleted: true,
            isDeleted: false,
            lastName: 'shan',
            lostReason: 'string',
            phone: '03172555927',
            pipelineStep: 'Closed Won',
            refEmail: 'odoobasit@gmail.com',
            refName: 'Syed Basit  Mehdi ',
            refPhone: '03338286467',
            refferralId: 8,
            status: '',
            territoryCity: 'anamoose',
            territoryState: 'north dakota',
            territoryZipcode: '12345',
            updateDt: '2024-12-06T13:55:56.327',
        },
        {
            docid: 427,
            agentUserId: 8,
            docDate: '2024-12-05T23:46:00.74',
            firstName: 'qamar',
            lastName: 'uddin',
            email: 'example2@gmail.com',
            phone: '03212223344',
            pipelineStep: 'Negotiation',
            status: '',
            territoryCity: 'anamoose',
            territoryState: 'north dakota',
            territoryZipcode: '12345',
            updateDt: '2024-12-06T13:55:56.327',
        },
        {
            docid: 405,
            agentUserId: 8,
            docDate: '2024-11-25T12:45:45.31',
            firstName: 'syed',
            lastName: 'basit',
            email: 'example3@gmail.com',
            phone: '03001234567',
            pipelineStep: 'Prospecting',
            status: '',
            territoryCity: 'anamoose',
            territoryState: 'north dakota',
            territoryZipcode: '12345',
            updateDt: '2024-12-06T13:55:56.327',
        },
        {
            docid: 398,
            agentUserId: 8,
            docDate: '2024-11-20T10:30:15.12',
            firstName: 'john',
            lastName: 'doe',
            email: 'example4@gmail.com',
            phone: '03331234567',
            pipelineStep: 'Contact Made',
            status: '',
            territoryCity: 'anamoose',
            territoryState: 'north dakota',
            territoryZipcode: '12345',
            updateDt: '2024-12-06T13:55:56.327',
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
                {/* <div className="flex justify-between items-center mb-[1rem] bg-white py-[1rem] px-[0.5rem] rounded-xl shadow">
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
                </div> */}
                {/* <div> */}
                <div className="flex justify-between mb-[1rem] bg-white py-[1rem] px-[0.5rem] rounded-xl shadow">
                    <div className="flex flex-col gap-[0.3rem]">
                        <h1 className="text-black ">Company name</h1>
                        <p className="text-black text-[1rem]">
                            company address
                        </p>
                        <p className="text-black text-[1rem]">
                            Phone : 123456789
                        </p>
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
                        data={filteredCandidates}
                        // searchQuery={searchQuery}
                        // setSearchQuery={setSearchQuery}
                        headerConfig={headerConfig}
                    />
                </div>
                {/* </div> */}
            </div>
        </>
    )
}

export default TotalBonus
