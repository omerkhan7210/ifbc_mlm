import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    BASE_API_URL,
    HEADER_TOKEN,
    USER_TOKEN,
} from '@/constants/app.constant'

const OtpForm = ({
    setFormFields,
    handleSubmit,
    email,
    firstName,
    formErrors,
    loadingOtpValidation,
    setShow,
}) => {
    // State to hold the values of the OTP input fields
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(300);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

    // Handle input change
    const handleChange = (element, index) => {
        const value = element.value;

        if (/^\d$/.test(value)) {
            // Only accept a single digit (0-9)
            let newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to the next input if it's not the last one
            if (element.nextSibling && value) {
                element.nextSibling.focus();
            }
        }
    };

    // Handle key press for backspace
    const handleKeyDown = (e, index) => {
        const { key } = e;

        if (key === "Backspace") {
            // If backspace is pressed and the current input is empty, move to the previous input
            if (index >= 0) {
                let newOtp = [...otp];
                newOtp[index] = ""; // Clear the previous input
                setOtp(newOtp);
                e.target.previousSibling.focus(); // Move focus to the previous input
            }
        }
    };

    useEffect(() => {
        if (otp) {
            const newOtp = otp.join("");
            setFormFields((prev) => ({ ...prev, otpCode: newOtp }));
        }
    }, [otp]);

    // Effect to handle the countdown timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timer); // Clear the timer when the component is unmounted
        } else {
            setIsResendDisabled(false); // Enable the resend button when the time reaches 0
        }
    }, [timeLeft]);

    // Function to format time in MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    // Handler for resending the code
    const handleResend = async () => {
        setLoading(true);
        try {
            const otpData = {
                email,
                firstName,
            };
            const baseUrl = `${BASE_API_URL}/otp/send-otp`;
            const response = await axios.post(baseUrl, otpData, {
                headers: {
                    "X-App-Token": HEADER_TOKEN,
                },
            });
            if (response?.status === 200) {
                setLoading(false);
                setIsResendDisabled(true);
                setTimeLeft(600); // Reset the timer to 10 minutes (600 seconds)
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {" "}
            <div className="otpoverlay" />
            <form className="otp-Form" onSubmit={handleSubmit}>
                <button
                    type="button"
                    className="absolute top-5 right-10"
                    onClick={(e) => {
                        e.preventDefault();
                        setShow(false);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="red"
                        className="size-9"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </button>
                {formErrors?.error === "Email already exists." ? (
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-center">
                            {email} already exists as a user in IFBC, you can try using
                            another email
                        </p>
                        <p className="text-center">Do you want to review your details?</p>
                        <div className="flex gap-3 justify-center">
                            <button
                                className="ok-btn md:w-24"
                                type="button"
                                onClick={() => setShow(false)}
                            >
                                Review Details
                            </button>
                            <NavLink to="/" className="cancel-btn md:w-24" type="button">
                                Cancel
                            </NavLink>
                        </div>
                    </div>
                ) : formErrors?.error ===
                    "Email already attached to another account. You can login to your existing account." ? (
                    <div className="flex flex-col gap-2 justify-center items-center">
                        <p className="text-center">
                            Your email ({email}) already attached to another account. You can
                            login to your existing account.
                        </p>
                        <p className="text-center">
                            Do you want to login to your existing account or do you want to
                            review your details?
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                className="ok-btn md:w-32"
                                type="button"
                                onClick={() => history("/login")}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setShow(false)}
                                className="back-btn md:w-36 flex justify-center"
                                type="button"
                            >
                                Review Details
                            </button>
                            <NavLink to="/" className="cancel-btn md:w-32" type="button">
                                Cancel
                            </NavLink>
                        </div>
                    </div>
                ) : (
                    <>
                        {formErrors.error && (
                            <p className="border-2 w-full justify-center border-red-600 text-red-600 rounded-xl p-4 flex items-center">
                                {formErrors.error}
                            </p>
                        )}

                        <span className="mainHeading">Enter OTP</span>
                        <p className="otpSubheading">
                            We have sent a verification code to your email
                        </p>
                        <div className="inputContainer">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    required
                                    maxLength={1}
                                    type="text"
                                    className="otp-input"
                                    value={otp[index]}
                                    onKeyDown={(e) => handleKeyDown(e, index)} // Handle key down event
                                    onFocus={(e) => e.target.select()} // Optional: Select the input when focused
                                    onChange={(e) => handleChange(e.target, index)}
                                />
                            ))}
                        </div>
                        <button
                            disabled={loadingOtpValidation}
                            className="verifyButton"
                            type="button"
                            onClick={handleSubmit}
                        >
                            {loadingOtpValidation ? "Loading..." : "Verify"}
                        </button>
                        <p className="resendNote">
                            Didn't receive the code?{" "}
                            <button
                                className="resendBtn"
                                type="button"
                                onClick={handleResend}
                                disabled={isResendDisabled || loading}
                            >
                                {loading ? "Loading..." : "Resend Code"}{" "}
                                {isResendDisabled && `(${formatTime(timeLeft)})`}
                            </button>
                        </p>
                    </>
                )}
            </form>
        </>
    );
};

export default OtpForm;