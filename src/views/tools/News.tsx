import React, { useState } from 'react'
import { LuFileSearch } from 'react-icons/lu'
import FileUploadModel from '../../components/forms/FileUploadModel'

const News = () => {
    const [fileUploadModel, setFileUploadodel] = useState(false)
    const toggleFileUploadModel = () => {
        setFileUploadodel(!fileUploadModel)
    }
    return (
        <>
            <div className="bg-white p-[1rem] rounded-xl ">
                <div className="flex justify-end border-b-[0.2rem]">
                    <button
                        className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF] max-w-[50%] md:max-w-[20%]'
                        onClick={toggleFileUploadModel}
                    >
                        Upload News
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center min-h-[62vh] border">
                    {fileUploadModel && (
                        <FileUploadModel onClose={toggleFileUploadModel} />
                    )}
                    <LuFileSearch
                        size={120}
                        className="text-gray-500 mb-[1rem]"
                    />
                    <h1 className="text-gray-700">Upload Your Files</h1>
                </div>
            </div>
        </>
    )
}

export default News
