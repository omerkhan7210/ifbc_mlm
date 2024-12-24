import React, { useState } from 'react'
import { IoMdAddCircle } from "react-icons/io";
import Button from '@/components/ui/Button'

const InvitationEmail = ({ onClose, allBulkEmailName }) => {

    const [addEmail, setAddEmail] = useState(false)
    const handleToogle = () => {
        setAddEmail(!addEmail)
    }
    return (
        <div
            id="crud-modal"
            // tabindex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-auto"
        >
            <div className="max-h-[100vh] overflow-auto relative w-full min-w-[50%] max-w-md max-h-auto bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        New Message
                    </h3>
                    <button
                        onClick={onClose} // Close the modal when clicked
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form className="p-4 md:p-5"
                //  onSubmit={handleSendBulkEmail}
                >
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                To All Selected Members
                            </label>


                            <div className="flex flex-wrap gap-2 border p-2 rounded-lg">
                                {allBulkEmailName?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-600 dark:text-white"
                                    >
                                        @{item.firstName} {item.lastName}
                                    </div>
                                ))}
                                <IoMdAddCircle size={43} className='mt-1 cursor-pointer'
                                    onClick={handleToogle} />
                            </div>
                        </div>
                        {addEmail && (
                            <div className="flex items-center gap-2 border p-2 rounded-lg w-full col-span-2">
                                <input
                                    className="flex-grow p-[8px] rounded-sm font-md border"
                                    type="text"
                                    id="subject"
                                    placeholder="Enter Your Email"
                                />
                                <Button
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-400 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-6 text-white"
                                >
                                    ADD
                                </Button>
                            </div>
                        )}
                    </div>
                    <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-400 hover:text-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-center px-6 text-white inline-flex items-center"
                    // onClick={() => headerConfig.buttonAction('invitation')}
                    // disabled={selectRowName.length === 0}
                    >
                        Send
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default InvitationEmail