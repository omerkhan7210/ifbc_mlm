import React, { useState, useEffect } from 'react';
import AddUserInGraph from '../../../components/forms/AddUserInGraph';
import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant'
import axios from "axios";
import toast from 'react-hot-toast';
import { getData } from '@/services/axios/axiosUtils';
import { useAuth } from '@/auth';

const RegisterUser = () => {
    const { user } = useAuth();

    const [formFields, setFormFields] = useState({
        mangerName: user?.firstName || '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        userName: '',
        refferralId: user?.userId,
        userType: 'Ambassador',
    });
    console.log(formFields, "formFields")
    const [formErrors, setFormErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    // const [selectedUser, setSelectedUser] = useState(null);

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
        if (!formFields.email) errors.email = "Email is required";
        if (!formFields.phone) errors.phone = "Phone number is required";
        if (!formFields.password) errors.password = "Password is required";
        if (!formFields.userType) errors.userType = "User Type is required";
        // if (!formFields?.refferralId) errors.refferralId = "Referral Name required";
        if (!formFields.userName) errors.userName = "User Name is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Submit form data after validation
    const handleSubmitAfterValidation = () => {
        if (!validateForm()) return;

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
            usertype: "A",
            profileimage: formFields.profileimage ?? "",
            coverimage: formFields.coverimage ?? "",
            isVerified: true,
            password: formFields?.password,
            gettingStartedStep: "1",
            isApproved: false,
            alreadyApproved: false,
            username: formFields?.userName,
        };

        axios
            .post(userUrl, data, {
                headers: {
                    "X-App-Token": HEADER_TOKEN,
                },
            })
            .then((response) => {
                console.log(response , "amb responce")
                toast.success("User added successfully!");
                setFormFields({
                    mangerName: "",
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    userName: '',
                    refferralId: '',
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

export default RegisterUser;
