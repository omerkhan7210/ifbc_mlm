import React, { useState, useEffect } from 'react';
import AddUserInGraph from '../../../components/forms/AddUserInGraph';
import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant';
import axios from "axios";
import toast from 'react-hot-toast';
import Loading from "../../../components/shared/Loading";
import { getData, postData } from '@/services/axios/axiosUtils';
import { useAuth } from '@/auth';

const ConsultantRegister = () => {
    const { user } = useAuth();
    // const [loader, setLoader] = useState(false);

    const [formFields, setFormFields] = useState({
        mangerName: user?.firstName || '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: '',
        userName: '',
        street: '',
        city: '',
        postal: '',
        state: '',
        geographical: '',
        employed: '',
        presentations: '',
        networking: '',
        hearAbout: '',
        hearAboutSpecify: "",
        userType: "Consultants",
        refferralId: user?.userId,
    });
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Validation functionz
    const validateForm = () => {
        const errors = {};

        if (!formFields.mangerName.trim()) errors.mangerName = "Manager Name is required.";
        if (!formFields.firstName.trim()) errors.firstName = "First Name is required.";
        if (!formFields.lastName.trim()) errors.lastName = "Last Name is required.";
        if (!formFields.email.trim()) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formFields.email)) {
            errors.email = "Invalid email address.";
        }
        if (!formFields.phone.trim()) {
            errors.phone = "Phone number is required.";
        } else if (!/^\d{10,15}$/.test(formFields.phone)) {
            errors.phone = "Invalid phone number.";
        }
        if (!formFields.password.trim()) {
            errors.password = "Password is required.";
        } else if (formFields.password.length < 6) {
            errors.password = "Password must be at least 6 characters long.";
        }
        if (!formFields.confirmpassword.trim()) {
            errors.confirmpassword = "Confirm Password is required.";
        } else if (formFields.password !== formFields.confirmpassword) {
            errors.confirmpassword = "Passwords do not match.";
        }
        if (!formFields.street.trim()) errors.street = "Street address is required.";
        if (!formFields.city.trim()) errors.city = "City is required.";
        if (!formFields.postal.trim()) {
            errors.postal = "Postal Code is required.";
        } else if (!/^\d{4,10}$/.test(formFields.postal)) {
            errors.postal = "Invalid Postal Code.";
        }
        if (!formFields.state.trim()) errors.state = "State/Region is required.";
        if (!formFields.geographical.trim()) errors.geographical = "Geographical area is required.";
        if (!formFields.employed.trim()) errors.employed = "Employment status is required.";
        if (!formFields.presentations.trim()) errors.presentations = "Comfort level with presentations is required.";
        if (!formFields.networking.trim()) errors.networking = "Networking comfort level is required.";
        if (!formFields.hearAbout.trim()) errors.hearAbout = "Source of information is required.";


        setFormErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    const notifyUpdate = (formErrors) => {
        if (!formErrors || typeof formErrors !== "string") {
            toast.error("Form error is missing or invalid!");
            return;
        }

        const firstName = capitalizeFirstLetter(formErrors);
        toast.success(
            `${firstName} - Please fill the form properly`,
            {
                style: {
                    backgroundColor: 'white',
                    color: 'rgba(0,0,0,0.8)',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    borderRadius: '8px',
                    padding: '10px',
                },
                icon: '🎉',
            }
        );
    };

    // Submit form data after validation
    const handleSubmitAfterValidation = () => {
        if (!validateForm()) {
            notifyUpdate(formErrors);
        }


        setIsLoading(true);
        const newUser = {
            userId: 0,
            refferralId: user?.userId ?? 0,
            firstname: formFields?.firstName,
            lastname: formFields?.lastName,
            email: formFields?.email,
            companyPhoneNumber: formFields?.phone,
            usertype: "C",
            isVerified: true,
            password: formFields?.password,
            gettingStartedStep: "1",
            isApproved: true,
            alreadyApproved: true,
            username: formFields?.email?.split('@')[0] || "",
            street: formFields?.street,
            city: formFields?.city,
            zipPostalCode: formFields?.postal,
            states: formFields?.state,
            geographical: formFields?.geographical,
            employed: formFields?.employed,
            presentations: formFields?.presentations,
            networking: formFields?.networking,
            hearAbout: formFields?.hearAbout,
            hearAboutSpecify: formFields?.hearAboutSpecify || "",
            isDeleted: false,
            isArchived: false,
        };
        console.log(newUser, "newUser");
        postData('consultants', newUser)
            .then((response) => {
                toast.success("User registered successfully!");
                setFormFields({
                    mangerName: "",
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmpassword: '',
                    userName: '',
                    refferralId: '',
                    street: "",
                    city: "",
                    postal: "",
                    state: "",
                    geographical: "",
                    employed: "",
                    presentations: "",
                    networking: "",
                    hearAbout: "",
                    hearAboutSpecify: "",
                });
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error adding user:', error);
                toast.success(error || "SomeThing is went to wrong!");
                setIsLoading(false);
            });
    };

    return (
        <div>
            <AddUserInGraph
                formFields={formFields}
                setFormFields={setFormFields}
                formErrors={formErrors}
                handleSubmitAfterValidation={handleSubmitAfterValidation}
                isLoading={isLoading}
            // loader={loader}
            />
        </div>
    );
};

export default ConsultantRegister;
