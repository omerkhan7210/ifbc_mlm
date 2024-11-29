import React from 'react'
import profileImage from '../../../public/images/logo/android-chrome-192x192.png'
import { HiDotsVertical } from 'react-icons/hi'
import { Input } from '@/components/ui'

const ProfileView = () => {
    return (
        <>
            <div>
                <div className="flex justify-between mb-[1rem] items-center px-[0.5rem] py-[0.7rem] bg-white shadow rounded-xl">
                    <h5>All user's details</h5>
                 
                        <input type="text" />
                        <button className='w-[10%]  inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] justify-center text-[#FFFFFF]'>
                            View
                        </button>
                </div>
                <div>
                    <div className="flex justify-between w-[100%] items-start gap-[1rem]">
                        <div className="relative bg-white w-[30%] shadow rounded-xl py-[1rem]">
                            <HiDotsVertical
                                size={25}
                                className="absolute top-2 right-2"
                            />
                            <div className="flex flex-col items-center justify-center gap-[0.3rem] mb-[1rem]">
                                <img
                                    src={profileImage}
                                    width={120}
                                    alt="profileImage"
                                    className="rounded-full mb-[1rem]"
                                />
                                <p>Full Name</p>
                                <p>USER Name</p>
                                <p>ifbcAdmin@gmail.com</p>
                            </div>
                        </div>
                        <div className="bg-white mb-[1rem] w-[70%] shadow rounded-xl py-[1rem] px-[0.5rem]">
                            <h4 className="mb-[0.5rem]">Membership Package</h4>
                            <div className="flex justify-between gap-2">
                                <div>
                                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <svg
                                            className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                                        </svg>
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                Need a help in Claim?
                                            </h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                            Go to this step by step guideline
                                            process on how to certify for your
                                            weekly benefits:
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex font-medium items-center text-blue-600 hover:underline"
                                        >
                                            See our guideline
                                            <svg
                                                className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                                <div>
                                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <svg
                                            className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
                                        </svg>
                                        <a href="#">
                                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                                Need a help in Claim?
                                            </h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                                            Go to this step by step guideline
                                            process on how to certify for your
                                            weekly benefits:
                                        </p>
                                        <a
                                            href="#"
                                            className="inline-flex font-medium items-center text-blue-600 hover:underline"
                                        >
                                            See our guideline
                                            <svg
                                                className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between w-[100%] items-start gap-[1rem]">
                        <div className="bg-white w-[30%] shadow rounded-xl flex flex-col items-center justify-start p-[1rem]">
                            <button className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF]'>
                                Personal Details
                            </button>
                            <button className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF]'>
                                Bank Details
                            </button>
                            <button className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF]'>
                                Contact Details
                            </button>
                        </div>
                        <div className="bg-white w-[70%] shadow rounded-xl p-[1rem]">
                            <span className="flex justify-between items-center mb-4">
                                <p className="min-w-[30%]">Address</p>{' '}
                                <Input
                                    placeholder="Enter Your Value"
                                    // {...props}
                                    // value={props.value}
                                    // suffix={inputSuffix}
                                    // prefix={inputPrefix}
                                />
                            </span>
                            <span className="flex justify-between items-center mb-4">
                                <p className="min-w-[30%]">Address</p>{' '}
                                <Input
                                    placeholder="Enter Your Value"
                                    // {...props}
                                    // value={props.value}
                                    // suffix={inputSuffix}
                                    // prefix={inputPrefix}
                                />
                            </span>
                            <span className="flex justify-between items-center mb-4">
                                <p className="min-w-[30%]">Address</p>{' '}
                                <Input
                                    placeholder="Enter Your Value"
                                    // {...props}
                                    // value={props.value}
                                    // suffix={inputSuffix}
                                    // prefix={inputPrefix}
                                />
                            </span>
                            <span className="flex justify-between items-center mb-4">
                                <p className="min-w-[30%]">Address</p>{' '}
                                <Input
                                    placeholder="Enter Your Value"
                                    // {...props}
                                    // value={props.value}
                                    // suffix={inputSuffix}
                                    // prefix={inputPrefix}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileView
