import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant'
import { postData } from '@/services/axios/axiosUtils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import profile from '/images/logo/android-chrome-192x192.png'

interface EmailFormState {
    subject: string
    body: string
    files: File[]
}

const EmailModel = ({ onClose, allBulkEmailName }: { onClose: () => void }) => {
    const [emailForm, setEmailForm] = useState<EmailFormState>({
        subject: '',
        body: '',
        files: [],
    })

    const handleChange = (
        field: keyof EmailFormState,
        value: string | File[],
    ) => {
        setEmailForm((prevState) => ({
            ...prevState,
            [field]: value,
        }))
    }

    const handleFileChange = (event) => {
        const files = event.target.files // Get all selected files
        handleChange('files', Array.from(files)) // Store files as an array
    }

    const receiversEmails = allBulkEmailName?.map((item) => item?.email)
    // const receiversEmails = [
    //     'mshayanshakeel786@gmail.com',
    //     'odoobasit@gmail.com',
    //     // 'unitytech0@gmail.com',
    // ]

    // const handleSendBulkEmail = async (event: React.FormEvent) => {
    //     event.preventDefault()

    //     const formData = new FormData()
    //     if (receiversEmails && receiversEmails.length > 0) {
    //         formData.append('receiverEmails', JSON.stringify(receiversEmails))
    //     }
    //     formData.append('subject', emailForm?.subject)
    //     formData.append('Body', emailForm?.body)
    //     formData.append('files', [emailForm?.files])

    //     // if (emailForm?.files?.length > 0) {
    //     //     const filesArray = emailForm.files.map((file, index) => {
    //     //         return { key: `files`, file }
    //     //     })

    //     //     filesArray.forEach(({ key, file }) => {
    //     //         formData.append(key, file)
    //     //     })
    //     // }
    //     for (const [key, value] of formData.entries()) {
    //         console.log(
    //             `${key}:`,
    //             value instanceof File ? `File(${value.name})` : value,
    //         )
    //     }
    //     // postData('emailing/send-email-bulk', formData)

    //     const baseUrl = `${BASE_API_URL}/emailing/send-bulk-email` //https://backend.ifbc.co/api/emailing/
    //     await axios
    //         .post(baseUrl, formData, {
    //             headers: {
    //                 // 'Content-Type': 'multipart/form-data',
    //                 'X-App-Token': HEADER_TOKEN,
    //             },
    //         })
    //         .then((response) => console.log('User added:', response))
    //         .catch((error) => console.error('Error adding user:', error))
    // }

    const handleSendBulkEmail = async (e) => {
        e.preventDefault()

        const data = new FormData()
        if (receiversEmails && receiversEmails.length > 0) {
            data.append('ReceiverEmails', JSON.stringify(receiversEmails))
        }

        // if (receiversEmails && receiversEmails.length > 0) {
        //     data.append('ReceiverEmails', JSON.stringify(receiversEmails))
        // }
        data.append('Subject', emailForm?.subject)
        data.append('Body', emailForm?.body)
        if (emailForm?.files && emailForm.files.length > 0) {
            emailForm.files.forEach((file) => {
                console.log('Appending file:', file)
                data.append('Files', file) // Append each file directly
            })
        }

        // Log FormData entries (for debugging)
        for (let [key, value] of data.entries()) {
            console.log(
                `${key}: ${value instanceof File ? `File(${value.name})` : value}`,
            )
        }

        try {
            const response = await axios.post(
                `${BASE_API_URL}/emailing/send-bulk-email`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-App-Token': HEADER_TOKEN,
                    },
                },
            )
            alert('Emails sent successfully!')
        } catch (error) {
            console.error('Error sending emails:', error)
            // alert('Failed to send emails. Check the console for details.')
        }
    }

    // const handleSendBulkEmail = async (event: React.FormEvent) => {
    //     event.preventDefault()

    //     const formData = new FormData()

    //     // Append receiver emails and email details
    //     if (receiversEmails && receiversEmails.length > 0) {
    //         formData.append('ReceiverEmails', JSON.stringify(receiversEmails))
    //     }
    //     formData.append('Subject', emailForm?.subject)
    //     formData.append('Body', emailForm?.body)

    //     if (emailForm?.files && emailForm.files.length > 0) {
    //         emailForm.files.forEach((file) => {
    //             console.log('Appending file:', file)
    //             formData.append('files', file)
    //         })
    //     }

    //     for (const [key, value] of formData.entries()) {
    //         console.log(
    //             `${key}:`,
    //             value instanceof File ? `File(${value.name})` : value,
    //         )
    //     }
    //     // Send the request
    //     const baseUrl = `${BASE_API_URL}/emailing/send-bulk-email`
    //     await axios
    //         .post(baseUrl, formData, {
    //             headers: {
    //                 'X-App-Token': HEADER_TOKEN,
    //             },
    //         })
    //         .then((response) => console.log('User added:', response))
    //         .catch((error) => console.error('Error adding user:', error))
    // }
    console.log(emailForm, 'emailForm', emailForm?.files)
    return (
        <div
            id="crud-modal"
            // tabindex="-1"
            aria-hidden="true"
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 overflow-auto"
        >
            <div className="relative w-full min-w-[50%] max-w-md max-h-auto bg-white rounded-lg shadow dark:bg-gray-700">
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

                {/* <form className="p-4 md:p-5" <form className="p-4 md:p-5" onSubmit={handleSendBulkEmail}>> */}
                <form className="p-4 md:p-5" onSubmit={handleSendBulkEmail}>
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
                            {/* <label
                                htmlFor="description"
                                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Message
                            </label> */}
                            <div style={{ marginBottom: '15px' }}>
                                <label
                                    htmlFor="subject"
                                    style={{ fontWeight: 'bold' }}
                                >
                                    Subject:
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={emailForm?.subject}
                                    onChange={(e) =>
                                        handleChange('subject', e.target.value)
                                    }
                                    placeholder="Enter email subject"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        marginTop: '5px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                    }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <input
                                    type="file"
                                    id="subject"
                                    // value={emailForm?.subject}
                                    onChange={handleFileChange}
                                    placeholder="Select Files"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        marginTop: '5px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                    }}
                                />
                            </div>

                            <div className="relative">
                                <ReactQuill
                                    className="h-[11rem]"
                                    theme="snow"
                                    value={emailForm.body}
                                    onChange={(value) =>
                                        handleChange('body', value)
                                    }
                                    placeholder="Write something here..."
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:mt-[2rem] mt-[4rem]"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EmailModel
