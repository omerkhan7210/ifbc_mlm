import React, { useState, useEffect } from 'react';
import AddUserInGraph from '../../../components/forms/AddUserInGraph';
import toast from 'react-hot-toast';
import { postData } from '@/services/axios/axiosUtils';
import { useAuth } from '@/auth';

const RegisterUser = () => {
    const { user } = useAuth();
    const [loader, setLoader] = useState(false);

    const [formFields, setFormFields] = useState({
        mangerName: user?.firstName || '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: '',
        userName: '',
        coverimage: "",
        profileimage: "",
        userType: "Ambassador",
        // street: '',
        // city: '',
        // postal: '',
        // state: '',
        // geographical: '',
        // employed: '',
        // presentations: '',
        // networking: '',
        // hearAbout: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Validation function
    const validateForm = () => {
        const errors = {};

        if (!formFields.mangerName.trim()) errors.mangerName = "Consultant Name is required.";
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
        // if (!formFields.password.trim()) {
        //     errors.password = "Password is required.";
        // } else if (formFields.password.length < 6) {
        //     errors.password = "Password must be at least 6 characters long.";
        // }
        // if (!formFields.confirmpassword.trim()) {
        //     errors.confirmpassword = "Confirm Password is required.";
        // } else if (formFields.password !== formFields.confirmpassword) {
        //     errors.confirmpassword = "Passwords do not match.";
        // }
        // if (!formFields.street.trim()) errors.street = "Street address is required.";
        // if (!formFields.city.trim()) errors.city = "City is required.";
        // if (!formFields.postal.trim()) {
        //     errors.postal = "Postal Code is required.";
        // } else if (!/^\d{4,10}$/.test(formFields.postal)) {
        //     errors.postal = "Invalid Postal Code.";
        // }
        // if (!formFields.state.trim()) errors.state = "State/Region is required.";
        // if (!formFields.geographical.trim()) errors.geographical = "Geographical area is required.";
        // if (!formFields.employed.trim()) errors.employed = "Employment status is required.";
        // if (!formFields.presentations.trim()) errors.presentations = "Comfort level with presentations is required.";
        // if (!formFields.networking.trim()) errors.networking = "Networking comfort level is required.";
        // if (!formFields.hearAbout.trim()) errors.hearAbout = "Source of information is required.";

        setFormErrors(errors);
        return Object?.keys(errors)?.length === 0;
    };


    const notifyUpdate = (formErrors) => {
        if (!formErrors || typeof formErrors !== "string") {
            toast.error("Form error is missing or invalid!");
            return;
        }
    };


    // Submit form data after validation
    const handleSubmitAfterValidation = () => {
        if (!validateForm()) {
            notifyUpdate(formErrors);
            return;
        }
        setLoader(true);
        const newUser = {
            userId: 0,
            refferralId: user?.userId ?? 0,
            firstname: formFields?.firstName,
            lastname: formFields?.lastName,
            email: formFields?.email,
            phone: formFields?.phone,
            usertype: "A",
            isVerified: true,
            password: formFields?.password,
            gettingStartedStep: "1",
            isApproved: true,
            alreadyApproved: true,
            username: formFields?.email?.split('@')[0] || "",
            profileimage: formFields.profileimage ?? "",
            coverimage: formFields.coverimage ?? "",
            // street: formFields?.street,
            // city: formFields?.city,
            // zipPostalCode: formFields?.postal,
            // states: formFields?.state,
            // geographical: formFields?.geographical,
            // employed: formFields?.employed,
            // presentations: formFields?.presentations,
            // networking: formFields?.networking,
            // hearAbout: formFields?.hearAbout,
            isDeleted: false,
            isArchived: false,
        };
        console.log(newUser, "newUser");
        postData('ambassador', newUser)
            .then((response) => {
                console.log('User added:', response);
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
                    userType: "Ambassador",
                    // street: "",
                    // city: "",
                    // postal: "",
                    // state: "",
                    // geographical: "",
                    // employed: "",
                    // presentations: "",
                    // networking: "",
                    // hearAbout: "",
                });
                setLoader(false);
            })
            .catch((error) => {
                console.error('Error adding user:', error);
                toast.error(error?.response?.data?.message ||
                    "Failed to register user. Please try again.");
                setLoader(false);
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
                loader={loader}
            />
        </div>
    );
};

export default RegisterUser;
