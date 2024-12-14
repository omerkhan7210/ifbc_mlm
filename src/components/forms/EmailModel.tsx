import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const EmailModel = ({ onClose, allBulkEmailName }: { onClose: () => void }) => {
    const [emailText, setEmailText] = useState<string>('')
    const handleChange = (value: string) => {
        setEmailText(value)
    }
    console.log(emailText, 'emailText')
    return (
        <div
            id="crud-modal"
            // tabindex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full min-w-[50%] max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
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

                <form className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label
                                htmlFor="name"
                                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                To All Selected Members
                            </label>

                            <input
                                type="text"
                                id="name"
                                value={allBulkEmailName
                                    ?.map(
                                        (item) =>
                                            `@${item.firstName} ${item.lastName}`,
                                    )
                                    .join(', ')}
                                disabled={true}
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                                placeholder="Enter Your email"
                            />
                        </div>
                        {/* <div className="col-span-2">
                            <label
                                htmlFor="price"
                                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                from
                            </label>
                            <input
                                type="text"
                                id="price"
                                className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                                placeholder="Enter Email"
                            />
                        </div> */}
                        <div className="col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Message
                            </label>
                            {/* <textarea
                                id="description"
                                rows={6}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your Message"
                            ></textarea> */}
                            <div>
                                <ReactQuill
                                    theme="snow"
                                    value={emailText}
                                    onChange={handleChange}
                                    placeholder="Write something here..."
                                />
                                <p>Editor Content:</p>
                                {/* <div
                                    dangerouslySetInnerHTML={{
                                        __html: emailText,
                                    }}
                                />{' '} */}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EmailModel
