import React, { useEffect, useState } from 'react'
import IFBC from "../../../public/images/logo/IFBC 1.png"
import { RxCross2 } from "react-icons/rx";
import { BASE_API_URL, HEADER_TOKEN } from "../../constants/app.constant"
import axios from "axios"
import OptForm from './OptForm';
import Loading from "../../components/shared/Loading"
import { apiGetAllUsers } from '@/services/UsersService'
import { useAuth } from '@/auth'
import { getData } from '@/services/axios/axiosUtils'
import { BiHide } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";

const AddUserInGraph = ({ selectedNode, onClose }) => {
    // const [label, setLabel] = useState(selectedNode.data.label);
    const { user } = useAuth()
    const [selectedUser, setSelectedUser] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    // const [showOtpForm, setShowOtpForm] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [otpValues, setOtpValues] = useState();
    const [formErrors, setFormErrors] = useState({});
    const [formFields, setFormFields] = useState({
        mangerName: user?.firstName,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        userName: '',
        refferralId: '',
        userType: '',
    })

    const validateForm = () => {
        const errors = {};

        if (!formFields.firstName) errors.firstName = "First Name is required";
        if (!formFields.lastName) errors.lastName = "Last Name is required";
        if (!formFields.email) errors.email = "Email is required";
        if (!formFields.phone) errors.phone = "Phone number is required";
        if (!formFields.password) errors.password = "Password is required";
        if (!formFields.userType) errors.userType = "User Type is required";
        if (!formFields?.refferralId) errors.refferralId = "Refferral Name required"
        if (!formFields.userName) errors.userName = "User Name is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    console.log(formFields, "formFields")

    // const handleOTPData = (val) => {
    //     setOtpValues(val)
    // }

    // const handleSendOtp = async (e) => {
    //     e.preventDefault();

    //     if (!validateForm()) return;

    //     const otpData = {
    //         email: formFields?.email?.toLowerCase(),
    //         firstname: formFields?.firstName?.toLowerCase(),
    //     };
    //     localStorage.setItem("tempEmail", otpData?.email)

    //     try {
    //         const baseUrl = `${BASE_API_URL}/otp/send-otp`;
    //         const response = await axios.post(baseUrl, otpData, {
    //             headers: {
    //                 "X-App-Token": HEADER_TOKEN,
    //             },
    //         });

    //         if (response?.status === 200) {
    //             console.log(response);
    //             setSuccessMsg("Enter your OTP code:");
    //             setShowOtpForm(true);
    //             window.scrollTo(0, 0)
    //         }
    //     } catch (error) {
    //         console.error("Error sending OTP:", error);
    //     }
    // };

    // const validateOtp = async (e) => {
    //     setIsLoading(true);
    //     e.preventDefault();
    //     try {
    //         const email = localStorage.getItem("tempEmail")
    //         console.log(email, "email")
    //         if (formFields?.otpCode !== "") {
    //             const otpData = {
    //                 email: email.toLowerCase(),
    //                 // otp: formFields.otpCode,
    //                 otp: otpValues,
    //             };
    //             const baseUrl = `${BASE_API_URL}/otp/validate-otp`;
    //             console.log(HEADER_TOKEN, "HEADER_TOKEN1")
    //             const response = await axios.post(baseUrl, otpData, {
    //                 headers: {
    //                     "X-App-Token": HEADER_TOKEN,
    //                 },
    //             });
    //             if (response.status === 200) {
    //                 const response = await handleSubmitAfterValidation();
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
    //                     setIsLoading(false);
    //                     alert('sibmit Form')
    //                     showOtpForm(false)
    //                 }
    //                 localStorage.removeItem("tempEmail")
    //             }
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         // setFormErrors({ error: error?.response?.data?.message });
    //         setIsLoading(false);
    //     }
    // };

    // const handleSubmitAfterValidation = async () => {
    //     try {
    //         const userUrl = `${BASE_API_URL}/users`;

    //         const user = {
    //             userId: user?.userId,
    //             refferralId: user?.docId ?? 0,
    //             refferralId: formFields?.refferralId,
    //             firstname: formFields?.firstName,
    //             lastname: formFields?.lastName,
    //             email: formFields?.email,
    //             phone: formFields?.phone,
    //             usertype: formFields?.userType,
    //             profileimage: formFields.profileimage ?? "",
    //             coverimage: formFields.coverimage ?? "",
    //             isVerified: true,
    //             password: formFields?.password,
    //             gettingStartedStep: "1",
    //             isApproved: false,
    //             alreadyApproved: false,
    //             // username: formFields.email.split("@")[0],
    //             username: formFields?.userName,
    //         };
    //         const response = await axios.post(userUrl, user, {
    //             headers: {
    //                 "X-App-Token": HEADER_TOKEN,
    //             },
    //         });
    //         return response;
    //     } catch (error) {
    //         console.error("Error:", error);
    //         // setFormErrors({ error: error?.response?.data?.message });
    //         window.scrollTo(0, 0);
    //         // setIsLoading(false);
    //     }
    // };
    const handleSubmitAfterValidation = () => {
        setIsLoading(true);
        const userUrl = `${BASE_API_URL}/users`;

        const data = {
            userId: user?.userId,
            refferralId: user?.docId ?? 0,
            refferralId: formFields?.refferralId,
            firstname: formFields?.firstName,
            lastname: formFields?.lastName,
            email: formFields?.email,
            phone: formFields?.phone,
            usertype: formFields?.userType,
            profileimage: formFields.profileimage ?? "",
            coverimage: formFields.coverimage ?? "",
            isVerified: true,
            password: formFields?.password,
            gettingStartedStep: "1",
            isApproved: false,
            alreadyApproved: false,
            // username: formFields.email.split("@")[0],
            username: formFields?.userName,
        };

        axios
            .post(userUrl, data, {
                headers: {
                    "X-App-Token": HEADER_TOKEN,
                },
            })
            .then((response) => {
                console.log(response, "responce")
                setFormFields({
                    mangerName: "",
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    userName: '',
                    refferralId: '',
                    userType: '',
                })
            })
            .catch((error) => {
                console.error("Error:", error);
                // setFormErrors({ error: error?.response?.data?.message });
                window.scrollTo(0, 0);
                setIsLoading(false);
            });
    };

    const handleData = () => {
        getData(`consultants/getconsultanthierarchy/${user?.userId}`)
            .then((data) => setSelectedUser(data))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        handleData()
    }, [])
    const mainSubConsultants = selectedUser?.subConsultants;
    return (
        <>
            {isLoading && (
                <div className="max-w-4xl mx-auto font-[sans-serif] absolute top-[5%] left-[5%] right-[5%] p-[20px] z-10 bg-white">
                    <Loading loading={isLoading} />
                </div>
            )}

            {/* {showOtpForm ? (
                <div className="max-w-4xl mx-auto font-[sans-serif] absolute top-[5%] left-[5%] right-[5%] p-[20px] z-10 bg-white ">
                    <OptForm
                        handleOTPData={handleOTPData}
                        onClose={onClose} validateOtp={validateOtp} />
                </div>
            ) : ( */}
            <div className="w-auto rounded-lg mx-auto font-[sans-serif] p-[20px] bg-white shadow-2xl overflow-auto">
                <div className="text-center mb-16 flex">
                    <a href="javascript:void(0)">
                        <img
                            src={IFBC} alt="logo" className='w-[50%] inline-block' />
                    </a>
                    {/* <button type="button"
                            onClick={onClose}
                        >
                            <RxCross2
                                size={25}
                                className='flex justify-end font-bold text-5xl items-start mt-[-2rem]'
                                onClick={onClose}
                            />

                        </button> */}
                </div>

                <form>
                    <div className="grid sm:grid-cols-2 gap-8">
                        {/* Input fields for form */}
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Manager Name</label>
                            <input
                                type="text" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name"
                                value={formFields?.mangerName}
                                onChange={(e) => setFormFields({ ...formFields, mangerName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                            <input
                                type="text" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name"
                                value={formFields.firstName}
                                onChange={(e) => setFormFields({ ...formFields, firstName: e.target.value })}
                            />
                            {formErrors.firstName && <p className="text-red-500 text-xs">{formErrors?.firstName}</p>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                            <input
                                type="text" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter last name"
                                value={formFields.lastName}
                                onChange={(e) => setFormFields({ ...formFields, lastName: e.target.value })}
                            />
                            {formErrors.lastName && <p className="text-red-500 text-xs">{formErrors?.lastName}</p>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                            <input type="text" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email"
                                value={formFields.email}
                                onChange={(e) => setFormFields({ ...formFields, email: e.target.value })} />
                            {formErrors.email && <p className="text-red-500 text-xs">{formErrors?.email}</p>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Mobile No.</label>
                            <input type="number" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter mobile number"
                                value={formFields.phone}
                                onChange={(e) => setFormFields({ ...formFields, phone: e.target.value })}
                            />
                            {formErrors.phone && <p className="text-red-500 text-xs">{formErrors?.phone}</p>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                            <input type={showPassword ? "text" : "password"} className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter password relative"
                                value={formFields.password}
                                onChange={(e) => setFormFields({ ...formFields, password: e.target.value })
                                }
                            />
                            <span
                                className="absolute right-[4rem] mt-[1.5rem] transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword((prew) => !prew)}
                            >
                                {showPassword ? <BiHide size={20} /> : <GrFormView size={30} />}
                            </span>
                            {formErrors.password && <p className="text-red-500 text-xs">{formErrors?.password}</p>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">User Name</label>
                            <input
                                type='text' className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter User name"
                                value={formFields.userName}
                                onChange={(e) => setFormFields({ ...formFields, userName: e.target.value })}
                            />
                            {formErrors.userName && <p className="text-red-500 text-xs">{formErrors?.userName}</p>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Select Refferral Name</label>
                            <select
                                className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                value={formFields.refferralId}
                                onChange={(e) => setFormFields({ ...formFields, refferralId: e.target.value })}
                            >
                                <option value="" disabled>Select User Type</option>
                                {
                                    mainSubConsultants?.map((item) => (
                                        <option value={item?.docId}>{item?.firstName}{item?.lastName}</option>
                                    ))
                                }
                            </select>
                            {formErrors.refferralId && <p className="text-red-500 text-xs">{formErrors?.refferralId}</p>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">User Type</label>
                            <select
                                className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                value={formFields.userType}
                                onChange={(e) => setFormFields({ ...formFields, userType: e.target.value })}
                            >
                                <option value="" disabled>Select User Type</option>
                                <option value="C">Consultant</option>
                                <option value="A">Ambassador</option>
                            </select>
                            {formErrors.userType && <p className="text-red-500 text-xs">{formErrors?.userType}</p>}
                        </div>
                    </div>

                    <div className="!mt-12">
                        <button type="button"
                            // onClick={handleSendOtp}
                            onClick={handleSubmitAfterValidation}
                            className="py-2.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
            {/* )
            } */}
        </>
    )
}

export default AddUserInGraph