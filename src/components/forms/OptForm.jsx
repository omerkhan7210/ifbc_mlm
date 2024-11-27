import React, { useEffect, useState } from 'react';


const OptForm = ({ validateOtp, handleOTPData }) => {
  const [localOtpNumbers, setLocalOtpNumbers] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
  });



  useEffect(() => {
    const concatenatedOtp = Object.values(localOtpNumbers).join('');
    handleOTPData(concatenatedOtp);
  }, [localOtpNumbers]);

  return (
    <>
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
          <p className="text-[15px] text-slate-500">
            Enter the 6-digit verification code that was sent to your email.
          </p>
        </header>
        <form id="otp-form">
          <div className="flex items-center justify-center gap-3">
            {/* OTP Inputs */}
            {["first", "second", "third", "fourth", "fifth", "sixth"].map((key) => (
              <input
                key={key}
                value={localOtpNumbers[key]}
                onChange={(e) =>
                  setLocalOtpNumbers({ ...localOtpNumbers, [key]: e.target.value })
                }
                type="text"
                className="w-12 h-12 text-center text-2xl font-extrabold text-slate-900 bg-slate-200 border hover:border-slate-300 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                maxLength="1"
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              onClick={validateOtp}
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form >
        <div className="text-sm text-slate-500 mt-4">
          Didn't receive code?{" "}
          <a
            className="font-medium text-indigo-500 hover:text-indigo-600"
            href="#0"
          >
            Resend
          </a>
        </div>
      </div >
    </>
  );
};

export default OptForm;
