import React, { useEffect, useState } from 'react'
import IFBC from '../../../public/images/logo/IFBC 1.png'
import { RxCross2 } from 'react-icons/rx'
import { BASE_API_URL, HEADER_TOKEN } from '../../constants/app.constant'
import axios from 'axios'
import OptForm from './OptForm'
import Loading from '../../components/shared/Loading'
import { apiGetAllUsers } from '@/services/UsersService'
import { useAuth } from '@/auth'

interface FormFields {
    teamsName: string
    addteamMembers: string[]
    assignDeals: string[]
}

interface FormErrors {
    teamsName?: string
    addteamMembers?: string
    assignDeals?: string
}

const TeamsForm = ({ onClose }) => {
    const [showOtpForm, setShowOtpForm] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [otpValues, setOtpValues] = useState()

    const [formErrors, setFormErrors] = useState<FormErrors>({})

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isDropdownOpen2, setIsDropdownOpen2] = useState(false)
    const [formFields, setFormFields] = useState<FormFields>({
        teamsName: '',
        addteamMembers: [],
        assignDeals: [],
    })
    const [cands, setCands] = useState([])
    const [members, setMembers] = useState([])
    console.log(cands, 'cands')
    console.log(formFields, 'formFields')

    const { user } = useAuth()
    console.log(user)

    useEffect(() => {
        const getCandidates = async () => {
            const response = await axios.get(
                `${BASE_API_URL}/candidateprofile`,
                {
                    headers: {
                        'X-App-Token': HEADER_TOKEN,
                    },
                },
            )
            const candidates = response.data
            const isAdmin = user.docId === 87
            const filteredCandidates = candidates?.filter((c) => {
                if (isAdmin) {
                    return c
                }
                return c.agentUserId === user.userId
            })
            setCands(filteredCandidates)
        }
        getCandidates()

        const getUsers = async () => {
            const response = await axios.get(`${BASE_API_URL}/users`, {
                headers: {
                    'X-App-Token': HEADER_TOKEN,
                },
            })
            const members = response.data
            const isAdmin = user.docId === 87
            const filteredMembers = members?.filter((c) => {
                if (isAdmin) {
                    return c
                }
                return c.refferralId === user.userId
            })
            setMembers(filteredMembers)
        }
        getUsers()
    }, [])

    const handleCheckboxChange = (event) => {
        const value = event.target.value
        const isChecked = event.target.checked

        setFormFields((prevState) => {
            return {
                ...prevState,
                addteamMembers: isChecked
                    ? [...prevState.addteamMembers, value]
                    : prevState.addteamMembers.filter((item) => item !== value),
            }
        })
    }
    const handleCheckboxChange2 = (event) => {
        const value = event.target.value
        const isChecked = event.target.checked

        setFormFields((prevState) => {
            return {
                ...prevState,
                assignDeals: isChecked
                    ? [...prevState.assignDeals, value]
                    : prevState.assignDeals.filter((item) => item !== value),
            }
        })
    }

    const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState)
    const toggleDropdown2 = () => setIsDropdownOpen2((prevState) => !prevState)

    const validateForm = () => {
        const errors: FormErrors = {}

        // Validation logic
        if (!formFields.teamsName) {
            errors.teamsName = 'Team Name is required'
        }
        if (formFields.addteamMembers.length === 0) {
            errors.addteamMembers = 'Minimum 1 Member is required'
        }
        if (!formFields.assignDeals) {
            errors.assignDeals = 'Deal Must be Assigned'
        }

        setFormErrors(errors) // Update error state

        // If no errors, proceed with form submission
        if (Object.keys(errors).length === 0) {
            // Handle form submission
            console.log('Form Submitted')
        }
    }

    // const handleOTPData = (val) => {
    //     setOtpValues(val)
    // }

    // const handleSendOtp = async (e) => {
    //     e.preventDefault()

    //     if (!validateForm()) return

    //     const otpData = {
    //         email: formFields?.email?.toLowerCase(),
    //         firstname: formFields?.firstName?.toLowerCase(),
    //     }
    //     localStorage.setItem('tempEmail', otpData?.email)

    //     try {
    //         const baseUrl = `${BASE_API_URL}/otp/send-otp`
    //         const response = await axios.post(baseUrl, otpData, {
    //             headers: {
    //                 'X-App-Token': HEADER_TOKEN,
    //             },
    //         })

    //         if (response?.status === 200) {
    //             console.log(response)
    //             setSuccessMsg('Enter your OTP code:')
    //             setShowOtpForm(true)
    //             window.scrollTo(0, 0)
    //         }
    //     } catch (error) {
    //         console.error('Error sending OTP:', error)
    //     }
    // }

    // const validateOtp = async (e) => {
    //     setIsLoading(true)
    //     e.preventDefault()
    //     try {
    //         const email = localStorage.getItem('tempEmail')
    //         console.log(email, 'email')
    //         if (formFields?.otpCode !== '') {
    //             const otpData = {
    //                 email: email.toLowerCase(),
    //                 // otp: formFields.otpCode,
    //                 otp: otpValues,
    //             }
    //             const baseUrl = `${BASE_API_URL}/otp/validate-otp`
    //             console.log(HEADER_TOKEN, 'HEADER_TOKEN1')
    //             const response = await axios.post(baseUrl, otpData, {
    //                 headers: {
    //                     'X-App-Token': HEADER_TOKEN,
    //                 },
    //             })
    //             if (response.status === 200) {
    //                 const response = await handleSubmitAfterValidation()
    //                 if (response?.status === 200) {
    //                     // setFormErrors({});
    //                     // setSuccessMsg(
    //                     //     <>
    //                     //         <p>
    //                     //             Thank you for signing up to become an IFBC Ambassador! We're
    //                     //             excited to have you on board.
    //                     //         </p>{" "}
    //                     //         <p>
    //                     //             Your application is currently under review by our team. Once
    //                     //             approved by an admin, you'll receive full access to your
    //                     //             ambassador dashboard and begin your journey of promoting and
    //                     //             expanding our franchise model.
    //                     //         </p>
    //                     //         <p>
    //                     //             We appreciate your patience during this process and will
    //                     //             notify you as soon as your account has been approved. Stay
    //                     //             tuned!
    //                     //         </p>{" "}
    //                     //     </>
    //                     // );
    //                     // setShow(true);
    //                     setIsLoading(false)
    //                     alert('sibmit Form')
    //                     showOtpForm(false)
    //                 }
    //                 localStorage.removeItem('tempEmail')
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         // setFormErrors({ error: error?.response?.data?.message });
    //         setIsLoading(false)
    //     }
    // }

    // const handleSubmitAfterValidation = async () => {
    //     try {
    //         const userUrl = `${BASE_API_URL}/users`

    //         const user = {
    //             userId: 0,
    //             // refferralId: consultant?.docId ?? 0,
    //             refferralId: 0,
    //             firstname: formFields?.firstName,
    //             lastname: formFields?.lastName,
    //             email: formFields?.email,
    //             phone: formFields?.phone,
    //             usertype: formFields?.userType,
    //             profileimage: formFields.profileimage ?? '',
    //             coverimage: formFields.coverimage ?? '',
    //             isVerified: true,
    //             password: formFields?.password,
    //             gettingStartedStep: '1',
    //             isApproved: false,
    //             alreadyApproved: false,
    //             // username: formFields.email.split("@")[0],
    //             username: formFields?.userName,
    //         }
    //         console.log(HEADER_TOKEN, 'HEADER_TOKEN2')
    //         const response = await axios.post(userUrl, user, {
    //             headers: {
    //                 'X-App-Token': HEADER_TOKEN,
    //             },
    //         })
    //         return response
    //     } catch (error) {
    //         console.error('Error:', error)
    //         // setFormErrors({ error: error?.response?.data?.message });
    //         window.scrollTo(0, 0)
    //         setIsLoading(false)
    //     }
    // }

    return (
        <>
            <div className="w-auto mx-auto font-[sans-serif] absolute top-[5%] left-[5%] right-[5%] p-[20px] z-10 bg-white shadow-2xl">
                <div className="text-center mb-16 flex">
                    <a href="javascript:void(0)">
                        <img
                            src={IFBC}
                            alt="logo"
                            className="w-[50%] inline-block"
                        />
                    </a>
                    <button type="button" onClick={onClose}>
                        <RxCross2
                            size={25}
                            className="flex justify-end font-bold text-5xl items-start mt-[-2rem]"
                            onClick={onClose}
                            // onClick={validateForm}
                        />
                    </button>
                </div>

                <form>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Team Name
                            </label>
                            <input
                                type="text"
                                className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                placeholder="Enter Your Team Name"
                                value={formFields?.teamsName}
                                onChange={(e) =>
                                    setFormFields({
                                        ...formFields,
                                        teamsName: e.target.value,
                                    })
                                }
                            />
                            {formErrors.teamsName && (
                                <p className="text-red-500 text-xs">
                                    {formErrors?.teamsName}
                                </p>
                            )}
                        </div>

                        {/* <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Add Teams
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={toggleDropdown}
                                    className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                >
                                    Select Team Members
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="consultant"
                                                value="C"
                                                checked={formFields.addteamMembers.includes(
                                                    'C',
                                                )}
                                                onChange={handleCheckboxChange}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor="consultant"
                                                className="text-sm"
                                            >
                                                Consultant
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="ambassador"
                                                value="A"
                                                checked={formFields.addteamMembers.includes(
                                                    'A',
                                                )}
                                                onChange={handleCheckboxChange}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor="ambassador"
                                                className="text-sm"
                                            >
                                                Ambassador
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="ambass34"
                                                value="R"
                                                checked={formFields.addteamMembers.includes(
                                                    'R',
                                                )}
                                                onChange={handleCheckboxChange}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor="ambass34"
                                                className="text-sm"
                                            >
                                                Ambass34
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="ambass355"
                                                value="U"
                                                checked={formFields.addteamMembers.includes(
                                                    'U',
                                                )}
                                                onChange={handleCheckboxChange}
                                                className="mr-2"
                                            />
                                            <label
                                                htmlFor="ambass355"
                                                className="text-sm"
                                            >
                                                Ambass355
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {formErrors.addteamMembers && (
                                <p className="text-red-500 text-xs">
                                    {formErrors?.addteamMembers}
                                </p>
                            )}
                        </div> */}

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Add Teams
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={toggleDropdown}
                                    className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                >
                                    Select Team Members
                                </button>

                                {isDropdownOpen && (
                                    <div className="p-[0.5rem] max-h-[35vh] overflow-auto absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
                                        {members?.map((member) => (
                                            <div
                                                key={member.docId}
                                                className="mt-[0.5rem]"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`member-${member.docId}`}
                                                    value={member.docId}
                                                    checked={formFields.addteamMembers.includes(
                                                        member.docId.toString(),
                                                    )}
                                                    onChange={
                                                        handleCheckboxChange
                                                    }
                                                    className="mr-2"
                                                />
                                                <label
                                                    htmlFor={`member-${member.docId}`}
                                                    className="text-sm"
                                                >
                                                    {`${member.firstName} ${member.lastName} (${member.email})`}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {formErrors.addteamMembers && (
                                <p className="text-red-500 text-xs">
                                    {formErrors?.addteamMembers}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">
                                Assign To Deals
                            </label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={toggleDropdown2}
                                    className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                >
                                    Select Team Members
                                </button>

                                {isDropdownOpen2 && (
                                    <div className="p-[0.5rem] max-h-[35vh] overflow-auto absolute bg-white border border-gray-300 rounded-md mt-1 w-full z-10">
                                        {cands?.map((card) => (
                                            <div
                                                key={card.docId}
                                                className="mt-[0.5rem]"
                                            >
                                                <input
                                                    type="checkbox"
                                                    id={`member-${card.docId}`}
                                                    value={card.docId}
                                                    checked={formFields.assignDeals.includes(
                                                        card?.docId?.toString(),
                                                    )}
                                                    onChange={
                                                        handleCheckboxChange2
                                                    }
                                                    className="mr-2"
                                                />
                                                <label
                                                    htmlFor={`card-${card.docId}`}
                                                    className="text-sm"
                                                >
                                                    {`${card.firstName} ${card.lastName} (${card.email})`}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {formErrors.addteamMembers && (
                                <p className="text-red-500 text-xs">
                                    {formErrors?.addteamMembers}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="!mt-12">
                        <button
                            type="button"
                            // onClick={handleSendOtp}
                            onClick={validateForm}
                            className="py-2.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default TeamsForm
