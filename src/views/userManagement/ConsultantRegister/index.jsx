import React, { useState, useEffect } from 'react';
import AddUserInGraph from '../../../components/forms/AddUserInGraph';
import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant'
import axios from "axios";
import toast from 'react-hot-toast';
import { getData } from '@/services/axios/axiosUtils';
import { useAuth } from '@/auth';

const ConsultantRegister = () => {
    const { user } = useAuth();

    const [formFields, setFormFields] = useState({
        mangerName: user?.firstName || '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: '',
        userName: "",
        street: "",
        city: "",
        postal: "",
        state: "",
        geographical: "",
        employed: "",
        presentations: "",
        networking: "",
        hearAbout: "",
        // hearAboutSpecify: "",
        refferralId: user?.userId,
        userType: 'Consultant',
    });
    // console.log(formFields, "formFields")
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Fetch consultants data
    // const fetchConsultants = () => {
    //     getData(`consultants/getconsultanthierarchy/${user?.userId}`)
    //         .then((data) => setSelectedUser(data))
    //         .catch((err) => console.log(err));
    // };

    // useEffect(() => {
    //     fetchConsultants();
    // }, []);

    // Form validation
    const validateForm = () => {
        const errors = {};
        if (!formFields.firstName) errors.firstName = "First Name is required";
        if (!formFields.lastName) errors.lastName = "Last Name is required";
        // Validation for Required Fields
        if (!formFields.firstName) errors.firstName = "First name is required. Please enter your first name.";
        if (!formFields.lastName) errors.lastName = "Last name is required. Please enter your last name.";
        if (!formFields.email) errors.email = "Email address is required. Please provide a valid email.";
        if (!formFields.phone) errors.phone = "Phone number is required. Please enter your mobile number.";
        if (!formFields.password) errors.password = "Password is required. Please create a strong password.";
        if (!formFields.confirmpassword) errors.confirmpassword = "Confirmation password is required. Please re-enter your password.";
        if (!formFields.city) errors.city = "City is required. Please provide your current city.";
        if (!formFields.employed) errors.employed = "Employment status is required. Please select your employment status.";
        if (!formFields.geographical) errors.geographical = "Geographical region is required. Please specify your region.";
        if (!formFields.hearAbout) errors.hearAbout = "Please let us know how you heard about us.";
        if (!formFields.hearAboutSpecify) errors.hearAboutSpecify = "Details about how you heard about us are required.";
        if (!formFields.networking) errors.networking = "Networking information is required. Please provide relevant details.";
        if (!formFields.postal) errors.postal = "Postal code is required. Please provide a valid postal code.";
        if (!formFields.presentations) errors.presentations = "Presentation details are required. Please fill in the necessary details.";
        if (!formFields.state) errors.state = "State is required. Please select your state.";
        if (!formFields.street) errors.street = "Street address is required. Please provide your street name or address.";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Submit form data after validation
    const handleSubmitAfterValidation = () => {
        if (!validateForm()) return;
        setIsLoading(true);
        // const userUrl = `${}/users`;

        const userUrl = `${BASE_API_URL}/consultants`;
        const data = {
            userId: 0,
            refferralId: user?.userId ?? 0,
            firstname: formFields?.firstName,
            lastname: formFields?.lastName,
            email: formFields?.email,
            companyPhoneNumber: formFields?.phone,
            usertype: "C",
            // profileimage: formFields.profileimage ?? "",
            // coverimage: formFields.coverimage ?? "",
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
            isDeleted: false,
            isArchived: false,
        };

        axios
            .post(userUrl, data, {
                headers: {
                    "X-App-Token": HEADER_TOKEN,
                },
            })
            .then((response) => {
                console.log(response, "esponce")
                toast.success("User added successfully!");
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
                    // userType: "",
                });
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error("Something went wrong!");
                setIsLoading(false);
            });
    };

    return (
        <div>
            <AddUserInGraph
                formFields={formFields}
                setFormFields={setFormFields}
                formErrors={formErrors}
                validateForm={validateForm}
                handleSubmit={handleSubmitAfterValidation}
                // selectedUser={selectedUser}
                isLoading={isLoading}
            />
        </div>
    );
};

export default ConsultantRegister;
