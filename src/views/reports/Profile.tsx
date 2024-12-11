import _ from 'lodash'
import React, { useContext, useEffect, useRef, useState } from 'react'
import BarLoader from '../../../src/Charts/BarLoader'
// import { MyCandContext } from 'src/Context/CandidatesDataContext'
import { convertKeysToLowercase } from '../../../src/Utils/ObjectMethods'
import PageTransition from '../../../src/Charts/PageTransition'
import axios from 'axios'
import {
    BASE_API_URL,
    HEADER_TOKEN,
    USER_TOKEN,
} from '@/constants/app.constant'
import './Profile.css'

import {
    validateLinkedIn,
    validatePhone,
    validateUsername,
    validateWebsiteUrl,
    validateZipcode,
} from '../../../src/Utils/SanitizeInput'
import { getCitiesOfState } from '../../../src/Utils/staticdata/data'
import RightSideBarProfile from './RightSidebarProfile'
import LeftSideBarProfile from './LeftSidebarProfile'
import { useAuth } from '@/auth'

const Profile = () => {
    const { user } = useAuth()
    const [formErrors, setFormErrors] = useState({})
    const token = localStorage.getItem('token') || ''
    const [formFields, setFormFields] = useState({})
    const [successMsg, setSuccessMsg] = useState(null)
    const [loading, setLoading] = useState(false)
    const [haveChanges, setHaveChanges] = useState(false)
    const [citiesC, setCitiesC] = useState([])
    const [selectedStateC, setSelectedStateC] = useState(null)

    // Function to fetch user details
    // const fetchUserDetails = async () => {
    //     const url = `${BASE_API_URL}/consultants/${userData.userId}`
    //     const response = await axios.get(url, {
    //         headers: {
    //             'X-App-Token': HEADER_TOKEN,
    //         },
    //     })
    //     return response.data
    // }

    // // Use React Query's useQuery hook
    // const {
    //     data: userDetails,
    //     error,
    //     isLoading,
    //     isError,
    //     refetch,
    // } = useQuery(['userDetails', userData.userId], fetchUserDetails, {
    //     enabled: !!token, // Only fetch if token is available
    // })
    // const token = localStorage.getItem('token') || ''

    // State to manage user details, loading, error states
    const [userDetails, setUserDetails] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    // Fetch user details function
    const fetchUserDetails = async () => {
        try {
            setIsLoading(true)
            const url = `${BASE_API_URL}/consultants/${user.userId}`
            // const url = `${BASE_API_URL}/consultants/0`
            const response = await axios.get(url, {
                headers: {
                    'X-App-Token': HEADER_TOKEN,
                },
            })
            setUserDetails(response.data)
            setIsLoading(false)
            setIsError(false) // Reset error when successful
        } catch (err) {
            setError(err)
            setIsLoading(false)
            setIsError(true)
        }
    }

    console.log(userDetails, 'userDetails')

    const refetch = () => {
        fetchUserDetails()
    }

    useEffect(() => {
        if (USER_TOKEN) {
            fetchUserDetails()
        }
    }, [USER_TOKEN, user.userId])

    // Handle loading and error state
    // if (isLoading) {
    //     return <div>Loading...</div>
    // }

    // if (isError) {
    //     return (
    //         <div>
    //             <p>Error: {error?.message}</p>
    //             <button onClick={refetch}>Retry</button>
    //         </div>
    //     )
    // }

    // Effect to convert keys to lowercase and set form fields
    useEffect(() => {
        if (userDetails) {
            const converted = convertKeysToLowercase(userDetails)
            setFormFields(converted)
        }
    }, [userDetails])

    useEffect(() => {
        if (
            userDetails &&
            !_.isEqual(convertKeysToLowercase(userDetails), formFields)
        ) {
            setHaveChanges(true)
            // proceed with form submission
        } else {
            setHaveChanges(false)
        }
    }, [formFields])

    const validateFields = () => {
        const reqFields = [
            'firstname',
            'lastname',
            'companyphonenumber',
            'email',
            'city',
            'zippostalcode',
        ]
        let allFieldsValid = true
        let formErrors = {}

        reqFields.forEach((field) => {
            const newKey = field
            const value = formFields[newKey]?.trim() || ''

            if (!value) {
                formErrors[newKey] = 'This field is required'
                allFieldsValid = false
            } else {
                // Field-specific validations
                if (newKey === 'companyphonenumber' && !validatePhone(value)) {
                    formErrors[newKey] = 'invalid'
                    allFieldsValid = false
                } else if (newKey === 'firstname' && !validateUsername(value)) {
                    formErrors[newKey] = 'invalid'
                    allFieldsValid = false
                } else if (newKey === 'lastname' && !validateUsername(value)) {
                    formErrors[newKey] = 'invalid'
                    allFieldsValid = false
                } else if (
                    newKey === 'zippostalcode' &&
                    !validateZipcode(value)
                ) {
                    formErrors[newKey] = 'invalid'
                    allFieldsValid = false
                } else {
                    formErrors[newKey] = ''
                }
            }
        })

        if (
            formFields?.linkedinurl !== '' &&
            !validateLinkedIn(formFields?.linkedinurl)
        ) {
            formErrors['linkedinurl'] = 'invalid'
            allFieldsValid = false
        }

        if (
            formFields?.websiteurl !== '' &&
            !validateWebsiteUrl(formFields?.websiteurl)
        ) {
            formErrors['websiteurl'] = 'invalid'
            allFieldsValid = false
        }

        if (
            formFields?.companyname !== '' &&
            !validateUsername(formFields?.companyname)
        ) {
            formErrors['companyname'] = 'invalid'
            allFieldsValid = false
        }

        setFormErrors(formErrors)
        return allFieldsValid
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const allFieldsValid = validateFields()
        if (!allFieldsValid) {
            setFormErrors((prev) => ({
                ...prev,
                error: 'Please fill in all the required fields correctly',
            }))
            setLoading(false)
            window.scrollTo(0, 200)
            return
        }

        try {
            const baseUrl = `${BASE_API_URL}/consultants`

            // Send the PUT request using Axios
            const response = await axios.put(
                `${baseUrl}/${formFields?.docid}`,
                formFields,
                {
                    headers: {
                        'X-App-Token': HEADER_TOKEN,
                    },
                },
            )

            if (response.status === 204) {
                setFormErrors({})
                setSuccessMsg('User Information Updated Successfully.')
                refetch()

                setLoading(false)
                setTimeout(() => {
                    setSuccessMsg(null)
                }, 1500)
            } else {
                setFormErrors({ error: response.data })
                setLoading(false)
                window.scrollTo(0, 500)
                // Handle unexpected response
            }
        } catch (error) {
            console.error('Error:', error)
            setFormErrors({ error: 'An error occurred. Please try again.' })
            return
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        const inputValue = type === 'checkbox' ? checked : value
        const newName = name.toLowerCase()

        setFormFields((prevFields) => ({
            ...prevFields,
            [newName]: inputValue,
        }))
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [newName]: '',
        }))
    }
    // isError
    if (isLoading && error && !userDetails) {
        return (
            <div className="grid place-items-center h-[500px]">
                <BarLoader bgcolor={'rgb(33, 118, 255)'} />
            </div>
        )
    }

    const handleStateChange = (e) => {
        const stateCode = e.target.value
        const cityList = getCitiesOfState(stateCode)
        setSelectedStateC(stateCode)

        setCitiesC(cityList)

        setFormFields((prev) => {
            return {
                ...prev,
                states: stateCode,
            }
        })
    }

    return (
        // <PageTransition isLoading={!!userDetails}>
        <form
            onSubmit={handleSubmit}
            id="main-profile-section"
            className="w-full md:grid max-md:flex flex-col grid-cols-12 py-5 gap-5 min-h-custom max-md:w-full md:max-w-[100%] mx-auto"
        >
            {userDetails && (
                <>
                    {' '}
                    <LeftSideBarProfile
                        userData={user}
                        formFields={formFields}
                        formErrors={formErrors}
                        handleInputChange={handleInputChange}
                        userDetails={userDetails}
                        successMsg={successMsg}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        // role={role}
                        role={'A'}
                        haveChanges={haveChanges}
                        setFormFields={setFormFields}
                        refetch={refetch}
                    />
                    <RightSideBarProfile
                        handleStateChange={handleStateChange}
                        formFields={formFields}
                        formErrors={formErrors}
                        handleInputChange={handleInputChange}
                        userDetails={userDetails}
                        selectedStateC={selectedStateC}
                        citiesC={citiesC}
                        setFormErrors={setFormErrors}
                        setFormFields={setFormFields}
                        handleSubmit={handleSubmit}
                        successMsg={successMsg}
                        loading={loading}
                    />
                </>
            )}
        </form>
        // </PageTransition>
    )
}

export default Profile

// import React, { useState } from 'react'
// import profileImage from '../../../public/images/logo/android-chrome-192x192.png'
// import { HiDotsVertical } from 'react-icons/hi'
// import { Input } from '@/components/ui'
// import { Button } from 'react-scroll'

// const Profile = () => {
//     const [toggleInfoForm, setToggleInfoForm] = useState({
//         personalDetails: true,
//         bankDetails: false,
//         contactDetrails: false,
//     })

//     const handleToggleComponent = (action) => {
//         setToggleInfoForm({
//             personalDetails: action === 'personalDetails',
//             bankDetails: action === 'bankDetails',
//             contactDetrails: action === 'contactDetrails',
//         })
//     }
//     return (
//         <>
//             <div>
//                 <div className="flex justify-between mb-[1rem] items-center px-[0.5rem] py-[0.7rem] bg-white shadow rounded-xl">
//                     <h5>All user's details</h5>

//                     <input type="text" />
//                     <button className="w-[10%]  inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] justify-center text-[#FFFFFF]">
//                         View
//                     </button>
//                 </div>
//                 <div>
//                     <div className="flex justify-between w-[100%] items-start gap-[1rem]">
//                         <div className="relative bg-white w-[30%] shadow rounded-xl py-[1rem]">
//                             <HiDotsVertical
//                                 size={25}
//                                 className="absolute top-2 right-2"
//                             />
//                             <div className="flex flex-col items-center justify-center gap-[0.3rem] mb-[1rem]">
//                                 <img
//                                     src={profileImage}
//                                     width={120}
//                                     alt="profileImage"
//                                     className="rounded-full mb-[1rem]"
//                                 />
//                                 <p>Full Name</p>
//                                 <p>USER Name</p>
//                                 <p>ifbcAdmin@gmail.com</p>
//                             </div>
//                         </div>
//                         <div className="bg-white mb-[1rem] w-[70%] shadow rounded-xl py-[1rem] px-[0.5rem]">
//                             <h4 className="mb-[0.5rem]">Membership Package</h4>
//                             <div className="flex justify-between gap-2">
//                                 <div>
//                                     <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                                         <svg
//                                             className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
//                                             aria-hidden="true"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="currentColor"
//                                             viewBox="0 0 20 20"
//                                         >
//                                             <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
//                                         </svg>
//                                         <a href="#">
//                                             <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
//                                                 Need a help in Claim?
//                                             </h5>
//                                         </a>
//                                         <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
//                                             Go to this step by step guideline
//                                             process on how to certify for your
//                                             weekly benefits:
//                                         </p>
//                                         <a
//                                             href="#"
//                                             className="inline-flex font-medium items-center text-blue-600 hover:underline"
//                                         >
//                                             See our guideline
//                                             <svg
//                                                 className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
//                                                 aria-hidden="true"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="none"
//                                                 viewBox="0 0 18 18"
//                                             >
//                                                 <path
//                                                     stroke="currentColor"
//                                                     stroke-linecap="round"
//                                                     stroke-linejoin="round"
//                                                     stroke-width="2"
//                                                     d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
//                                                 />
//                                             </svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                                         <svg
//                                             className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
//                                             aria-hidden="true"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="currentColor"
//                                             viewBox="0 0 20 20"
//                                         >
//                                             <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
//                                         </svg>
//                                         <a href="#">
//                                             <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
//                                                 Need a help in Claim?
//                                             </h5>
//                                         </a>
//                                         <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
//                                             Go to this step by step guideline
//                                             process on how to certify for your
//                                             weekly benefits:
//                                         </p>
//                                         <a
//                                             href="#"
//                                             className="inline-flex font-medium items-center text-blue-600 hover:underline"
//                                         >
//                                             See our guideline
//                                             <svg
//                                                 className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
//                                                 aria-hidden="true"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                                 fill="none"
//                                                 viewBox="0 0 18 18"
//                                             >
//                                                 <path
//                                                     stroke="currentColor"
//                                                     stroke-linecap="round"
//                                                     stroke-linejoin="round"
//                                                     stroke-width="2"
//                                                     d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
//                                                 />
//                                             </svg>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex justify-between w-[100%] items-start gap-[1rem]">
//                         <div className="bg-white w-[30%] shadow rounded-xl flex flex-col items-center justify-start p-[1rem]">
//                             <button
//                                 className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF]'
//                                 onClick={() =>
//                                     handleToggleComponent('personalDetails')
//                                 }
//                             >
//                                 Personal Details
//                             </button>
//                             <button
//                                 className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF]'
//                                 onClick={() =>
//                                     handleToggleComponent('bankDetails')
//                                 }
//                             >
//                                 Bank Details
//                             </button>
//                             <button
//                                 className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF]'
//                                 onClick={() =>
//                                     handleToggleComponent('contactDetrails')
//                                 }
//                             >
//                                 Contact Details
//                             </button>
//                         </div>
//                         <div className="bg-white w-[70%] shadow rounded-xl p-[1rem]">
//                             {toggleInfoForm?.personalDetails && (
//                                 <div>
//                                     <h4>Personal Details</h4>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">
//                                             First Name
//                                         </p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">Last Name</p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">Gender</p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">
//                                             Date of Birth
//                                         </p>
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <button
//                                         className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF]'
//                                         onClick={() =>
//                                             handleToggleComponent(
//                                                 'personalDetails',
//                                             )
//                                         }
//                                     >
//                                         Update
//                                     </button>
//                                 </div>
//                             )}
//                             {toggleInfoForm?.contactDetrails && (
//                                 <div>
//                                     <h4>Contant Details</h4>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">Address</p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">Address</p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">Address</p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">Address</p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <button
//                                         className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF]'
//                                         onClick={() =>
//                                             handleToggleComponent(
//                                                 'personalDetails',
//                                             )
//                                         }
//                                     >
//                                         Update
//                                     </button>
//                                 </div>
//                             )}
//                             {toggleInfoForm?.bankDetails && (
//                                 <div>
//                                     <h4>Bank Details</h4>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">Bank Name</p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">
//                                             Branch Name
//                                         </p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">
//                                             Account Holder Name
//                                         </p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">
//                                             Account Number
//                                         </p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">IFSC</p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>
//                                     <span className="flex justify-between items-center mb-4">
//                                         <p className="min-w-[30%]">PAN No</p>{' '}
//                                         <Input
//                                             placeholder="Enter Your Value"
//                                             // {...props}
//                                             // value={props.value}
//                                             // suffix={inputSuffix}
//                                             // prefix={inputPrefix}
//                                         />
//                                     </span>

//                                     <button
//                                         className='w-full "text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none hover:text-[#FFFFFF] mb-4 justify-center text-[#FFFFFF]'
//                                         onClick={() =>
//                                             handleToggleComponent(
//                                                 'personalDetails',
//                                             )
//                                         }
//                                     >
//                                         Update
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Profile
