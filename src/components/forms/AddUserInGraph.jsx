import React, { useEffect, useState } from 'react';
import { BiHide } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";
import Loading from "../../components/shared/Loading";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { states, getCitiesOfState } from "../../utils/staticdata/data"
import citiesByState from '../../../public/files/data.json'


const AddUserInGraph = ({
    formFields,
    setFormFields,
    formErrors,
    handleSubmitAfterValidation,
    loader
}) => {
    // const [showPassword, setShowPassword] = useState({
    //     password: false,
    //     confirmpassword: false,
    // });
    const [selectedState, setSelectedState] = useState("");


    const handleStateChange = (e) => {
        const selectedStateValue = e.target.value;
        setSelectedState(selectedStateValue);
        setFormFields({ ...formFields, state: selectedStateValue, city: "" });
    };

    const cities = selectedState ? citiesByState[selectedState] || [] : [];


    return (
        <>
            {loader && (
                <div className="max-w-4xl mx-auto  absolute top-[5%] left-[5%] right-[5%] p-[20px] z-10 bg-white">
                    <Loading loading={loader} />
                </div>
            )}

            <div className="w-auto rounded-lg mx-auto p-[10px] md:p-[20px] bg-white shadow-2xl overflow-auto">
                <div className="text-center mb-3 md:mb-6 flex">
                    <a href="javascript:void(0)">
                        <img
                            src="/images/logo/IFBC 1.png" alt="logo" className="w-[90%] md:w-[40%] inline-block" />
                    </a>
                </div>


                <h4 className='text-center mb-3 text-[16px] md:mb-6 md:text-xl flex justify-center items-center text-[#1E93EB]'>{formFields?.userType}</h4>

                <form>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {/* Input fields for form */}
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Consultant Name</label>
                            <input
                                type="text" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Consultant Name"
                                value={formFields?.mangerName}
                                disabled={true}
                                onChange={(e) => setFormFields({ ...formFields, mangerName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                            <input
                                type="text" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter First Name"
                                value={formFields.firstName}
                                onChange={(e) => setFormFields({ ...formFields, firstName: e.target.value })}
                            />
                            {formErrors.firstName && <p className="text-red-500 text-xs">{formErrors?.firstName}</p>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                            <input
                                type="text" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter Last Name"
                                value={formFields.lastName}
                                onChange={(e) => setFormFields({ ...formFields, lastName: e.target.value })}
                            />
                            {formErrors.lastName && <p className="text-red-500 text-xs">{formErrors?.lastName}</p>}
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email</label>
                            <input type="text" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter email"
                                value={formFields.email}
                                onChange={(e) => setFormFields({ ...formFields, email: e.target.value })} />
                            {formErrors.email && <p className="text-red-500 text-xs">{formErrors?.email}</p>}
                        </div>

                        {/* <div className='relative'>
                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                            <input type={showPassword?.password ? "text" : "password"} className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter Your Password"
                                value={formFields.password}
                                onChange={(e) => setFormFields({ ...formFields, password: e.target.value })
                                }
                            />
                            <span
                                className="absolute right-[1rem] mt-[1.5rem] transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword((prew) => ({
                                    ...prew,
                                    password: !prew.password
                                }))}
                            >
                                {showPassword?.password ? <BiHide size={20} /> : <GrFormView size={30} />}
                            </span>
                            {formErrors.password && <p className="text-red-500 text-xs">{formErrors?.password}</p>}
                        </div>
                        <div className='relative'>
                            <label className="text-gray-800 text-sm mb-2 block">Confirm password</label>
                            <input type={showPassword?.confirmpassword ? "text" : "password"} className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter your Confirm Password"
                                value={formFields.confirmpassword}
                                onChange={(e) => setFormFields({ ...formFields, confirmpassword: e.target.value })
                                }
                            />
                            <span
                                className="absolute right-[1rem] mt-[1.5rem] transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword((prew) => ({
                                    ...prew,
                                    confirmpassword: !prew.confirmpassword
                                }))}
                            >
                                {showPassword?.confirmpassword ? <BiHide size={20} /> : <GrFormView size={30} />}
                            </span>
                            {formErrors.confirmpassword && <p className="text-red-500 text-xs">{formErrors?.confirmpassword}</p>}
                        </div> */}

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Phone Number</label>
                            {/* <PhoneInput
                                country={'us'}
                                value={formFields.password}
                                onChange={(e) => setFormFields({ ...formFields, password: e.target.value })
                                }
                                inputClass="bg-gray-200 w-4 text-gray-800 text-sm px-0 py-4 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                dropdownClass="bg-gray-200"
                                placeholder="Enter mobile number"
                            /> */}

                            <input type="number" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter Phone Number"
                                value={formFields.phone}
                                onChange={(e) => setFormFields({ ...formFields, phone: e.target.value })}
                            />
                            {formErrors.phone && (
                                <p className="text-red-500 text-xs">{formErrors?.phone}</p>
                            )}
                        </div>

                        {
                            formFields?.userType === "Consultants" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">State/Region</label>
                                <select
                                    className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                    value={formFields.state || selectedState}
                                    onChange={handleStateChange}
                                >
                                    <option value="" disabled>Select State</option>
                                    {
                                        states?.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.text}
                                            </option>
                                        ))
                                    }
                                </select>
                                {formErrors.state && <p className="text-red-500 text-xs">{formErrors?.state}</p>}
                            </div>
                        }



                        {
                            formFields?.userType === "Consultants" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">City</label>
                                <select
                                    className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                    // value={formFields.city}
                                    // onChange={(e) => setFormFields({ ...formFields, city: e.target.value })}
                                    value={formFields.city}
                                    onChange={(e) => setFormFields({ ...formFields, city: e.target.value })}
                                >
                                    <option value="" disabled>Select City</option>
                                    {
                                        cities?.map((city, index) => (
                                            <option key={index} value={city}>{city}</option>
                                        ))
                                    }
                                </select>

                                {formErrors.city && <p className="text-red-500 text-xs">{formErrors?.city}</p>}
                            </div>
                        }

                        {
                            formFields?.userType === "Consultants" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Postal Code</label>
                                <input
                                    type='text' className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter Postal Code"
                                    value={formFields.postal}
                                    onChange={(e) => setFormFields({ ...formFields, postal: e.target.value })}
                                />
                                {formErrors.postal && <p className="text-red-500 text-xs">{formErrors?.postal}</p>}
                            </div>
                        }

                        {
                            formFields?.userType === "Consultants" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Street Address</label>
                                <input
                                    type='text' className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter Your Street Address"
                                    value={formFields.street}
                                    onChange={(e) => setFormFields({ ...formFields, street: e.target.value })}
                                />
                                {formErrors.street && <p className="text-red-500 text-xs">{formErrors?.street}</p>}
                            </div>
                        }

                        {
                            formFields?.userType === "Consultants" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">What geographical area are you interested in?</label>
                                <input
                                    type='text' className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter Geographical"
                                    value={formFields.geographical}
                                    onChange={(e) => setFormFields({ ...formFields, geographical: e.target.value })}
                                />
                                {formErrors.geographical && <p className="text-red-500 text-xs">{formErrors?.geographical}</p>}
                            </div>
                        }

                        {
                            formFields?.userType === "Consultants" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Are you currently employed?</label>
                                <select
                                    className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                    value={formFields.employed}
                                    onChange={(e) => setFormFields({ ...formFields, employed: e.target.value })}
                                >
                                    <option value="" disabled>Select One</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {formErrors.employed && <p className="text-red-500 text-xs">{formErrors?.employed}</p>}
                            </div>
                        }

                        {
                            formFields?.userType === "Consultants" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Comfortable Giving Presentations?</label>
                                <select
                                    className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                    value={formFields.presentations}
                                    onChange={(e) => setFormFields({ ...formFields, presentations: e.target.value })}
                                >
                                    <option value="" disabled>Select One</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {formErrors.presentations && <p className="text-red-500 text-xs">{formErrors?.presentations}</p>}
                            </div>
                        }


                        {
                            formFields?.userType === "Consultants" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Comfortable networking</label>
                                <select
                                    className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                    value={formFields.networking}
                                    onChange={(e) => setFormFields({ ...formFields, networking: e.target.value })}
                                >
                                    <option value="" disabled>Select One</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                                {formErrors.networking && <p className="text-red-500 text-xs">{formErrors?.networking}</p>}
                            </div>
                        }

                        {
                            formFields?.userType === "Consultants" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">How did you hear about us?</label>
                                <select
                                    className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                                    value={formFields.hearAbout}
                                    onChange={(e) => setFormFields({ ...formFields, hearAbout: e.target.value })}
                                >
                                    <option value="" disabled>Select Any One Option</option>
                                    <option value="Search Engine">Search Engine</option>
                                    <option value="Social (Facebook, Instagram, linkdin, etc)">Social(Facebook, Instagram, linkdin, etc)</option>
                                    <option value="Billboard">Billboard</option>
                                    <option value="Youtube">Youtube</option>
                                    <option value="TV">TV</option>
                                    <option value="Radio(AM/FM/XM)">Radio(AM/FM/XM)</option>
                                    <option value="In The Mail">In The Mail</option>
                                    <option value="Podcast">Podcast</option>
                                    <option value="Streaming Audio (Pandora, Spotify, etc)">Streaming Audio (Pandora, Spotify, etc)</option>
                                    <option value="Other">Other</option>
                                </select>
                                {formErrors.hearAbout && <p className="text-red-500 text-xs">{formErrors?.hearAbout}</p>}
                            </div>
                        }

                        {
                            formFields?.hearAbout === "Other" &&
                            <div>
                                <label className="text-gray-800 text-sm mb-2 block">Please specify</label>
                                <input type="text" className="bg-gray-200 w-full text-gray-800 text-sm px-4 py-2.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Please Specify"
                                    value={formFields.hearAboutSpecify}
                                    onChange={(e) => setFormFields({ ...formFields, hearAboutSpecify: e.target.value })} />
                                {formErrors.hearAboutSpecify && <p className="text-red-500 text-xs">{formErrors?.hearAboutSpecify}</p>}
                            </div>
                        }


                    </div>

                    <div className="!mt-12">
                        <button type="button"
                            onClick={() => handleSubmitAfterValidation()}
                            // onClick={() => handleSubmitAfterValidation()}

                            className="py-2.5 px-7 text-sm tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                            Register Member
                        </button>
                    </div>
                </form >
            </div >
        </>
    );
};

export default AddUserInGraph;
