import { Input } from '@/components/ui'
import React from 'react'

const CompanyProfile = () => {
    const instructionText = [
        'Maximum size allowed: 2MB',
        'File types allowed: png | jpeg| jpg | gif | ico',
        'Ideal image dimension for light background logo: 200x44 pixel ',
        'Ideal image dimension for dark background logo: 200x44 pixel',
        ' Ideal image dimension for collapsed logo: 55 x 55 pixels',
        'Ideal image dimension for favicon: 32 x 32 pixels',
    ]
    return (
        <>
            <div className="flex flex-col-reverse md:flex-row justify-between items-start bg-[#FFFFFF] p-[1rem]">
                <div className="md:max-w-[35%] max-w-[100%] p-[0.5rem]">
                    <h2 className="mb-[1rem]">Site Information</h2>
                    <label htmlFor="">Company Name</label>
                    <Input
                        className="border-gray-400 mb-[0.8em] rounded-sm"
                        placeholder="Company Name"
                        // {...props}
                        // value={props.value}
                        // suffix={inputSuffix}
                        // prefix={inputPrefix}
                    />
                    <label htmlFor="">Company Address</label>
                    <Input
                        className="mb-[0.8rem] border-gray-400 rounded-sm"
                        placeholder="Company Address"
                        // {...props}
                        // value={props.value}
                        // suffix={inputSuffix}
                        // prefix={inputPrefix}
                    />
                    <label htmlFor="">E-mail</label>
                    <Input
                        className="mb-[0.8rem] border-gray-400 rounded-sm"
                        placeholder="example@gmail.com"
                        // {...props}
                        // value={props.value}
                        // suffix={inputSuffix}
                        // prefix={inputPrefix}
                    />
                    <label htmlFor="">Phone</label>
                    <Input
                        className="mb-[0.8rem] border-gray-400 rounded-sm"
                        placeholder="03########"
                        // {...props}
                        // value={props.value}
                        // suffix={inputSuffix}
                        // prefix={inputPrefix}
                    />
                    <button
                        className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF] max-w-[50%] md:max-w-[40%]'
                        // onClick={toggleFileUploadModel}
                    >
                        Upload
                    </button>
                    {/* <Button /> */}
                </div>
                <div className="md:w-[60%] max-w-[100%]">
                    <h2>Logo and Favicon</h2>
                    <div className="bg-[#DDE2FA] p-[1rem] flex flex-col gap-[0.5rem] rounded-md mt-[1rem]">
                        {instructionText.map((text, index) => {
                            const parts = text.split(':')
                            return (
                                <p key={index} className="text-lg">
                                    <span className="font-bold">
                                        {parts[0]}:
                                    </span>
                                    {parts[1]}
                                </p>
                            )
                        })}
                    </div>
                    <div>
                        <div className="rounded-lg bg-[#F5F5F5] border-4 border-gray-200 border-dashed mt-6">
                            <div className="p-4 min-h-[180px] flex flex-col items-center justify-center text-center cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-10 mb-4 fill-gray-600 inline-block"
                                    viewBox="0 0 32 32"
                                >
                                    <path
                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                        data-original="#000000"
                                    />
                                    <path
                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                        data-original="#000000"
                                    />
                                </svg>

                                <h4 className="text-sm text-gray-600">
                                    Drag & Drop or{' '}
                                    <label className="text-blue-600 cursor-pointer">
                                        Choose file
                                    </label>{' '}
                                    to upload
                                </h4>
                                <input
                                    type="file"
                                    id="chooseFile"
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyProfile
