import { states } from "../../../src/Utils/staticdata/data";
import { useRef, useState } from "react";
import {
    BASE_API_URL,
    HEADER_TOKEN,
    USER_TOKEN,
} from '@/constants/app.constant'
import axios from "axios";
import OtpForm from "../../../src/GlobalPageSections/OtpForm";
import { captchaSubmit } from "../../../src/Utils/ValidateHuman";
import Recaptcha from "../../../src/utils/Recaptcha";
import DialogBox from "../../../src/Utils/Popups/DialogBox";
import { ErrorMsg } from "../../GlobalPageSections/ErrorMsg";
// import Login from "src/Authentication/Login";
import SignIn from "../../../src/views/auth/SignIn/SignIn";

const hearAbout = [
    { name: "Select one", text: "" },
    { name: "Seach Engine", text: "Seach Engine" },
    { name: "Billboard", text: "Billboard" },
    { name: "Social(Facebook, Instagram, LinkedIn, etc.)", text: "Social" },
    { name: "Youtube", text: "Youtube" },
    { name: "TV", text: "TV" },
    { name: "Radio(AM/FM/XM)", text: "Radio(AM/FM/XM)" },
    { name: "In The Mail", text: "In The Mail" },
    { name: "Podcast", text: "Podcast" },
    {
        name: "Streaming Audio (Pandora, Spotify, etc.)",
        text: "Streaming Audio (Pandora, Spotify, etc.)",
    },
    { name: "Other", text: "Other" },
];
const RightSideBarProfile = ({
    formErrors,
    handleInputChange,
    userDetails,
    handleStateChange,
    citiesC,
    formFields,
    setFormErrors,
    setFormFields,
    handleSubmit,
    successMsg,
    loading,
}) => {
    console.log(formErrors, "formErrors")
    const [show, setShow] = useState(false);
    const [loadingOtp, setLoadingOtp] = useState(false);
    const [loadingOpen, setLoadingOpen] = useState(false);
    const reCaptchaRef = useRef();
    const [otpVerified, setOtpVerified] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const editPersonalDetails = async (e) => {
        setLoadingOpen(true);

        const captchaResponse = await captchaSubmit(e, reCaptchaRef);

        if (captchaResponse?.success) {
            const otpData = {
                email: formFields.email?.toLowerCase(),
                firstname: formFields.firstname?.toLowerCase(),
            };
            const baseUrl = `${BASE_API_URL}/otp/send-otp`;
            const response = await axios.post(baseUrl, otpData, {
                headers: {
                    "X-App-Token": HEADER_TOKEN,
                },
            });
            if (response?.status === 200) {
                window.scrollTo(0, 0);
                setShow(true);
                setLoadingOpen(false);
            }
        }
    };

    const validateOtp = async (e) => {
        e.preventDefault();
        setLoadingOtp(true);
        try {
            if (formFields?.otpCode !== "") {
                const otpData = {
                    email: formFields.email?.toLowerCase(),
                    otp: formFields.otpCode,
                };
                const baseUrl = `${BASE_API_URL}/otp/validate-otp`;
                const response = await axios.post(baseUrl, otpData, {
                    headers: {
                        "X-App-Token": USER_TOKEN,
                    },
                });
                if (response?.status === 200) {
                    setLoadingOtp(false);
                    setShow(false);
                    setOtpVerified(true);
                    const inputs = document.querySelectorAll("#personal input");
                    inputs.forEach((input) => {
                        if (input.name !== "email") {
                            input.disabled = false;
                        }
                    });
                }
            }
        } catch (error) {
            console.error(error);
            setFormErrors({ error: error?.response?.data?.message });
            setLoadingOtp(false);
        }
    };

    const handleCheck = async (e) => {
        e.preventDefault();

        if (formFields?.username.includes(" ")) {
            setFormErrors({ error: "Username cannot contain spaces" });
            setLoadingOpen(false);
            return;
        }

        if (userDetails?.username !== formFields?.username) {
            try {
                const baseUrl = `${BASE_API_URL}/consultants/username/${formFields.username}`;

                // Send the PUT request using Axios
                const response = await axios.get(baseUrl, {
                    headers: {
                        "X-App-Token": HEADER_TOKEN,
                    },
                });

                if (response.status === 200) {
                    setShowLoginPopup(true);
                }
            } catch (error) {
                console.error(error);
                setFormErrors({ error: error?.response?.data });
            }
        } else {
            setShowLoginPopup(true);
        }
    };

    return (
        <div
            id="right-sidebar-profile"
            className=" w-full max-md:max-w-full col-span-8 bg-[#FFFFFF] border-gray-200 border max-md:p-5 md:p-5  rounded-xl"
        >
            {formErrors.error && (
                <p className="border-2 mb-5 border-red-600 text-red-600 p-4 flex justify-between">
                    {formErrors.error}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z"
                        />
                    </svg>
                </p>
            )}

            <DialogBox
                show={showLoginPopup}
                setShow={setShowLoginPopup}
                isSmall={"max-w-xl"}
            >
                <div className="bg-white p-5 rounded-xl">
                    {/* <Login
                        handleEditProfileInfo={handleSubmit}
                        editProfileEmail={formFields?.email}
                    /> */}
                    <SignIn
                        handleEditProfileInfo={handleSubmit}
                        editProfileEmail={formFields?.email} />
                </div>
            </DialogBox>

            <PersonalInfo
                userDetails={userDetails}
                handleInputChange={handleInputChange}
                formErrors={formErrors}
                editPersonalDetails={editPersonalDetails}
                loadingOpen={loadingOpen}
                otpVerified={otpVerified}
                handleCheck={handleCheck}
                loading={loading}
                successMsg={successMsg}
            />

            {show && (
                <OtpForm
                    handleSubmit={validateOtp}
                    setFormFields={setFormFields}
                    setShow={setShow}
                    formErrors={formErrors}
                    email={formFields?.email}
                    firstName={formFields?.firstname}
                    loadingOtpValidation={loadingOtp}
                />
            )}

            <AddressInfo
                userDetails={userDetails}
                handleInputChange={handleInputChange}
                formErrors={formErrors}
                citiesC={citiesC}
                handleStateChange={handleStateChange}
            />

            <CorporateInfo
                userDetails={userDetails}
                handleInputChange={handleInputChange}
                formErrors={formErrors}
            />

            <ProfileOverview
                userDetails={userDetails}
                handleInputChange={handleInputChange}
                formErrors={formErrors}
            />
            <Recaptcha reCaptchaRef={reCaptchaRef} />
        </div>
    );
};

const PersonalInfo = ({
    userDetails,
    handleInputChange,
    formErrors,
    editPersonalDetails,
    loadingOpen,
    otpVerified,
    handleCheck,
    loading,
    successMsg,
}) => {
    return (
        <div id="personal" className="flex flex-col bg-[#FFFFFF] p-5 rounded-xl">
            <h1 className="text-custom-heading-color font-bold text-xl text-left">
                Your Personal Information
            </h1>
            <div className="grid md:grid-cols-2 md:gap-x-6 max-md:gap-2 rounded-xl">
                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">Change your Username</p>
                    <div className="w-full">
                        {" "}
                        <input
                            disabled={true}
                            onChange={handleInputChange}
                            type="text"
                            name="username"
                            className="candidate-input w-full"
                            defaultValue={userDetails?.username}
                            style={{
                                borderColor: formErrors.username ? "red" : undefined,
                            }}
                        />
                        <ErrorMsg
                            formErrors={formErrors}
                            name={"username"}
                            type={"username"}
                            check={"invalid"}
                        />
                    </div>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">Email</p>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            type="email"
                            name="email"
                            className="candidate-input w-full"
                            disabled={true}
                            defaultValue={userDetails?.email}
                            style={{
                                borderColor: formErrors.email ? "red" : undefined,
                            }}
                        />
                        <ErrorMsg
                            formErrors={formErrors}
                            name={"email"}
                            type={"email"}
                            check={"invalid"}
                        />
                    </div>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">First Name</p>
                    <div className="w-full">
                        {" "}
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="firstname"
                            disabled={true}
                            className="candidate-input w-full"
                            defaultValue={userDetails?.firstName}
                            style={{
                                borderColor: formErrors.firstname ? "red" : undefined,
                            }}
                        />
                        <ErrorMsg
                            formErrors={formErrors}
                            name={"firstname"}
                            type={"username"}
                            check={"invalid"}
                        />
                    </div>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">Last Name</p>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            type="text"
                            disabled={true}
                            name="lastname"
                            className="candidate-input w-full"
                            defaultValue={userDetails?.lastName}
                            style={{
                                borderColor: formErrors.lastname ? "red" : undefined,
                            }}
                        />
                        <ErrorMsg
                            formErrors={formErrors}
                            name={"lastname"}
                            type={"username"}
                            check={"invalid"}
                        />
                    </div>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">Phone Number</p>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            type="number"
                            disabled={true}
                            name="companyphonenumber"
                            className="candidate-input w-full"
                            defaultValue={userDetails?.companyPhoneNumber}
                            style={{
                                borderColor: formErrors.companyphonenumber ? "red" : undefined,
                            }}
                        />
                        <ErrorMsg
                            formErrors={formErrors}
                            name={"companyphonenumber"}
                            type={"phone"}
                            check={"invalid"}
                        />
                    </div>
                </div>
            </div>
            {successMsg && (
                <p className="mt-3 border-2 border-green-800 text-green-800 p-4 flex items-center justify-between ">
                    {successMsg}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                        />
                    </svg>
                </p>
            )}
            {successMsg !== "" && (
                <button
                    type="button"
                    onClick={
                        !otpVerified ? (e) => editPersonalDetails(e) : (e) => handleCheck(e)
                    }
                    className="candidate-btn max-md:w-full md:max-w-[30%] mt-6"
                >
                    {loadingOpen && !otpVerified
                        ? "Loading..."
                        : loading
                            ? "Editing..."
                            : "Edit Personal Details"}
                </button>
            )}
        </div>
    );
};

const AddressInfo = ({
    userDetails,
    handleInputChange,
    formErrors,
    handleStateChange,
    citiesC,
}) => {
    return (
        <div
            id="address"
            className="flex flex-col bg-[#FFFFFF] p-5  rounded-xl my-5"
        >
            <h1 className="text-custom-heading-color font-bold text-xl text-left">
                Your Address Information
            </h1>
            <div className="grid md:grid-cols-2 md:gap-x-6 max-md:gap-2 rounded-xl">
                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">Address</p>
                    <input
                        onChange={handleInputChange}
                        type="text"
                        name="companyaddress"
                        className="candidate-input w-full"
                        defaultValue={userDetails?.companyAddress}
                    />
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">State/Province</p>

                    <div>
                        <input
                            onChange={handleStateChange}
                            id="states"
                            className="candidate-input w-full"
                            name="states"
                            style={{
                                borderColor: formErrors.states ? "red" : undefined,
                            }}
                            list="state"
                            defaultValue={
                                userDetails?.states?.length === 2
                                    ? states.find((state) => state.value === userDetails?.states)
                                        ?.text
                                    : userDetails?.states
                            }
                            placeholder="Type to search state"
                        />

                        <datalist id="state">
                            {states.map((state, index) => (
                                <option key={index} value={state?.text} />
                            ))}
                        </datalist>
                    </div>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">City</p>
                    <div>
                        <input
                            list="citiesC"
                            className="candidate-select"
                            name="city"
                            defaultValue={userDetails?.city}
                            onChange={handleInputChange}
                            style={{
                                borderColor: formErrors.city ? "red" : undefined,
                                width: "100%", // Ensures it takes full width of the container
                                minWidth: "200px", // Prevents shrinking too much
                            }}
                            placeholder="Type to search city"
                        />
                        <datalist id="citiesC">
                            {citiesC.map((city, index) => (
                                <option
                                    key={index}
                                    value={city}
                                    selected={userDetails.city === city}
                                />
                            ))}
                        </datalist>
                    </div>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">Zip/Postal Code</p>
                    <div className="w-full">
                        <input
                            placeholder="90212"
                            onChange={handleInputChange}
                            type="text"
                            name="zippostalcode"
                            className="candidate-input w-full"
                            defaultValue={userDetails?.zipPostalCode}
                            style={{
                                borderColor: formErrors.zippostalcode ? "red" : undefined,
                            }}
                        />
                        <ErrorMsg
                            formErrors={formErrors}
                            name={"zippostalcode"}
                            type={"zipcode"}
                            check={"invalid"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CorporateInfo = ({ userDetails, handleInputChange, formErrors }) => {
    return (
        <div
            id="corporate"
            className="flex flex-col bg-[#FFFFFF] p-5  rounded-xl my-5"
        >
            <h1 className="text-custom-heading-color font-bold text-xl text-left">
                Your Corporate and Meeting Information
            </h1>
            <div className="grid md:grid-cols-2 md:gap-x-6 max-md:gap-2 rounded-xl">
                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">Company Name:</p>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="companyname"
                            className="candidate-input w-full"
                            defaultValue={userDetails?.companyName}
                            style={{
                                borderColor: formErrors.companyName ? "red" : undefined,
                            }}
                        />
                        <ErrorMsg
                            formErrors={formErrors}
                            name={"companyname"}
                            type={"companyname"}
                            check={"invalid"}
                        />
                    </div>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">Website URL</p>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="websiteurl"
                            placeholder="https://www.example.com"
                            className="candidate-input w-full"
                            defaultValue={userDetails?.websiteUrl}
                            style={{
                                borderColor: formErrors.websiteurl ? "red" : undefined,
                            }}
                        />
                        <ErrorMsg
                            formErrors={formErrors}
                            name={"websiteurl"}
                            type={"websiteUrl"}
                            check={"invalid"}
                        />
                    </div>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">LinkedIn URL</p>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="linkedinurl"
                            placeholder="https://www.linkedin.com/in/johndoe"
                            className="candidate-input w-full"
                            defaultValue={userDetails?.linkedinUrl}
                            style={{
                                borderColor: formErrors.linkedinurl ? "red" : undefined,
                            }}
                        />
                        <ErrorMsg
                            formErrors={formErrors}
                            name={"linkedinurl"}
                            type={"linkedInUrl"}
                            check={"invalid"}
                        />
                    </div>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <p className="candidate-label">Meeting Link</p>
                    <div className="w-full">
                        <input
                            onChange={handleInputChange}
                            type="text"
                            name="meetinglink"
                            className="candidate-input w-full"
                            placeholder="https://www.example.com/meeting"
                            defaultValue={userDetails?.meetingLink}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProfileOverview = ({ userDetails, handleInputChange, formErrors }) => {
    return (
        <div
            id="profile-overview"
            className="flex flex-col bg-[#FFFFFF] p-5  rounded-xl my-5"
        >
            <h1 className="text-custom-heading-color font-bold text-xl text-left">
                Profile Overview and Preferences
            </h1>
            <div id="" className="grid md:grid-cols-2 md:gap-x-6 max-md:gap-2">
                <div className="candidate-sub-childs max-w-full">
                    <label className="candidate-label" htmlFor="geographical">
                        What geographical area are you interested in?
                    </label>
                    <input
                        onChange={handleInputChange}
                        name="geographical"
                        className="candidate-input w-full"
                        defaultValue={userDetails?.geographical}
                        type="text"
                        style={{
                            borderColor: formErrors.geographical ? "red" : undefined,
                        }}
                    />
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <label className="candidate-label" htmlFor="employed">
                        Are you currently employed?
                    </label>
                    <select
                        name="employed"
                        className="candidate-select w-full "
                        id="employed"
                        style={{
                            borderColor: formErrors.employed ? "red" : undefined,
                        }}
                        onChange={handleInputChange}
                    >
                        <option value="">Select one</option>
                        <option value="Yes" selected={userDetails?.employed === "Yes"}>
                            Yes
                        </option>
                        <option value="No" selected={userDetails?.employed === "No"}>
                            No
                        </option>
                    </select>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <label className="candidate-label">
                        Comfortable Giving Presentations?
                    </label>
                    <select
                        name="presentations"
                        className="candidate-select w-full "
                        id="presentations"
                        style={{
                            borderColor: formErrors.presentations ? "red" : undefined,
                        }}
                        onChange={handleInputChange}
                    >
                        <option value="">Select one</option>
                        <option value="Yes" selected={userDetails?.presentations === "Yes"}>
                            Yes
                        </option>
                        <option value="No" selected={userDetails?.presentations === "No"}>
                            No
                        </option>
                    </select>
                </div>

                <div className="candidate-sub-childs max-w-full">
                    <label className="candidate-label" htmlFor="networking">
                        Comfortable networking?
                    </label>
                    <select
                        name="networking"
                        className="candidate-select w-full "
                        id="networking"
                        style={{
                            borderColor: formErrors.networking ? "red" : undefined,
                        }}
                        onChange={handleInputChange}
                    >
                        <option value="">Select one</option>
                        <option value="Yes" selected={userDetails?.networking === "Yes"}>
                            Yes
                        </option>
                        <option value="No" selected={userDetails?.networking === "No"}>
                            No
                        </option>
                    </select>
                </div>

                <div className="candidate-sub-childs max-w-full w-full">
                    <label className="candidate-label">How did you hear about us?</label>
                    <select
                        name="hearAbout"
                        className="candidate-select w-full "
                        id="hearAbout"
                        style={{
                            borderColor: formErrors.hearAbout ? "red" : undefined,
                        }}
                        onChange={handleInputChange}
                    >
                        {hearAbout.map((option) => (
                            <option
                                key={option.text}
                                value={option.text}
                                selected={userDetails?.hearAbout === option.text}
                            >
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="candidate-sub-childs w-full max-w-full">
                    <p className="candidate-label">Short Description</p>
                    <input
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Tell us about yourself"
                        name="shortdescription"
                        className="candidate-input w-full"
                        defaultValue={userDetails?.shortDescription}
                    />
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="candidate-sub-childs w-full max-w-full">
                    <label htmlFor="message" className="candidate-label">
                        Notes
                    </label>
                    <textarea
                        name="notes"
                        placeholder="Provide some notes"
                        onChange={handleInputChange}
                        id="message"
                        rows={5}
                        className="candidate-input w-full"
                        defaultValue={userDetails?.notes}
                    />
                </div>
            </div>
        </div>
    );
};

export default RightSideBarProfile;