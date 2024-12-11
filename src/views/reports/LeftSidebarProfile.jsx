import { checkRole } from "../../../src/Utils/checkRole";
import DialogBox from "../../../src/utils/Popups/DialogBox";
import { FormatRawDate } from "../../../src/Utils/FormatRawDate";
import Avatar from "react-avatar-edit";
import "./Profile.css"
// import { setProfileImage } from "src/Redux/listingReducer";
// import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
    BASE_API_URL,
    HEADER_TOKEN,
    USER_TOKEN,
} from '@/constants/app.constant'

const LeftSideBarProfile = ({
    userDetails,
    successMsg,
    handleSubmit,
    loading,
    role,
    haveChanges,
    userData,
    refetch,
}) => {
    // const [settingsOn, setSettingsOn] = useState(false);
    // const [expOn, setExpOn] = useState(false);
    // const [dealOn, setDealOn] = useState(false);

    const { bgcolor, roleName } = checkRole(role);

    const [image, setImage] = useState(localStorage.getItem("dpImageUrl") || "");
    const [preview, setPreview] = useState("../../../public/images/logo/android-chrome-192x192.png");
    const [imagePrevShow, setImagePrevShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingUpload, setLoading] = useState(false);
    // const dispatch = useDispatch();

    const handleCrop = (croppedImage) => {
        setPreview(croppedImage);
        console.log(croppedImage, " croppedImage")
    };

    const handleClose = () => {
        setPreview(null);
    };

    // Convert base64 to File object (image format)
    const base64ToFile = (base64String, filename) => {
        const arr = base64String.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    };
    // Function to handle image change
    const handleChangeImage = async () => {
        setLoading(true);
        if (!preview) {
            console.error("No image to upload.");
            return;
        }

        const file = base64ToFile(preview, "avatar.png"); // You can change the file extension

        const formData = new FormData();
        formData.append("image", file); // Append the file to FormData

        try {
            // Send the image to your backend API
            const response = await axios.post(
                `${BASE_API_URL}/users/upload-image/${userData.userId}`, // Replace with your backend API URL
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-App-Token": HEADER_TOKEN,
                    },
                }
            );

            // Check for success and handle the response
            if (response.data.success) {
                setImage(response.data.url); // Set the uploaded image URL in your state
                dispatch(setProfileImage(response.data.url));
                localStorage.setItem("dpImageUrl", response.data.url);
                setLoading(false);
                refetch();
                setPreview(null);
                setImagePrevShow(false);
                window.location.reload();
            } else {
                setLoading(false);

                console.error(response.data.message); // Handle errors sent from the backend
            }
        } catch (err) {
            setLoading(false);

            console.error("File upload failed", err); // Handle network or other errors
        }
    };

    const handleButtonClick = () => {
        setImagePrevShow(true);
    };

    const initialSrc = userData.profileImage
        ? image === ""
            ? `${userData.profileImage}`
            : image
        : image === ""
            ? role === "C"
                ? "../../../public/images/logo/android-chrome-192x192.png"
                : "../../../public/images/logo/android-chrome-192x192.png"
            : image;

    const [imgSrc, setImgSrc] = useState(initialSrc);
    console.log(imgSrc, "imgSrc")

    useEffect(() => {
        setImgSrc(initialSrc);
    }, [userData, image]);

    const handleError = () => {
        if (role === "C") {
            setImgSrc("../../../public/images/logo/android-chrome-192x192.png");
        } else {
            setImgSrc("../../../public/images/logo/android-chrome-192x192.png");
        }
    };
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    // Validate file before loading into Avatar Editor
    const handleBeforeFileLoad = (event) => {
        const file = event.target.files[0];

        // Check if the file is an image
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            setErrorMessage(
                "Invalid file type. Please select an image file (JPG, PNG, WebP, GIF)."
            );
            event.target.value = ""; // Clear the file input
            return;
        }

        // Check file size
        if (file.size > maxFileSize) {
            setErrorMessage("File size exceeds 5MB. Please select a smaller file.");
            event.target.value = ""; // Clear the file input
            return;
        } // Clear any previous errors
        setErrorMessage("");
    };

    return (
        <div
            id="left-sidebar"
            className="h-full w-full col-span-4 bg-blue-100 p-5  rounded-xl relative"
        >
            <div
                id="user-container"
                className="w-full col-span-4 flex flex-col max-md:items-center  sticky top-0"
            >
                <div
                    id="image-container-profile"
                    className="flex items-center gap-5 relative justify-center"
                >
                    <div>
                        <label htmlFor="profile-image-upload" className="relative">
                            <DialogBox
                                setShow={setImagePrevShow}
                                show={imagePrevShow}
                                isSmall={"sm:max-w-md"}
                            >
                                <div className="bg-white p-10 flex flex-col items-center justify-center gap-3">
                                    {errorMessage && (
                                        <p className="text-red-500">{errorMessage}</p>
                                    )}

                                    <Avatar
                                        width={390}
                                        height={295}
                                        onCrop={handleCrop}
                                        onClose={handleClose}
                                        src={null} // Optional: Use this if you want to load a default image
                                        onBeforeFileLoad={handleBeforeFileLoad}
                                    />

                                    {preview && (
                                        <div className="flex flex-col gap-5 w-full items-center">
                                            <h3 className="text-xl bg-blue-100 p-2 w-full text-center">
                                                Preview:
                                            </h3>
                                            <div className="flex gap-3">
                                                <div className="profile-view flex flex-col items-center gap-2">
                                                    <h5>Profile Image View</h5>
                                                    <img
                                                        src={preview}
                                                        alt="Preview"
                                                        className="rounded-full w-44 h-44 object-cover cursor-pointer"
                                                    />{" "}
                                                </div>
                                                <div className="image-view flex flex-col items-center gap-2">
                                                    <h5>Header Image View</h5>
                                                    <img
                                                        src={preview}
                                                        alt="Preview"
                                                        className="w-10 h-10 object-cover rounded-full"
                                                    />{" "}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleChangeImage}
                                                className="candidate-btn w-full"
                                            >
                                                {loadingUpload ? "Uploading..." : "Upload Image"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </DialogBox>
                            <img
                                src={imgSrc}
                                alt="User Profile"
                                className="rounded-full w-25 h-25 object-cover cursor-pointer"
                                onError={handleError}
                            />

                            <button
                                type="button"
                                className="absolute top-3 right-3 bg-[#1E93EB]  rounded-full p-1 flex items-center justify-center"
                                onClick={handleButtonClick}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="rgb(33, 118, 255)"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                </svg>
                            </button>
                        </label>
                        <h1
                            style={{ background: bgcolor }}
                            className="candidate-label  w-full text-white text-center rounded-full px-3 mt-5"
                        >
                            {roleName}
                        </h1>
                    </div>
                </div>

                <div
                    id="user-details-container"
                    className="h-full w-full flex flex-col  gap-3 py-5"
                >
                    <div className="flex gap-2 items-start flex-wrap">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="rgb(33, 118, 255)"
                            className="size-6 "
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>

                        <h1 className="icon-text capitalize text-custom-blue">
                            {userDetails.firstName} {userDetails.lastName}
                        </h1>
                    </div>

                    <div className="flex gap-2 items-center flex-wrap">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="rgb(33, 118, 255)"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                            />
                        </svg>
                        <h1 className="icon-text">{userDetails.companyPhoneNumber}</h1>
                    </div>

                    <div className="flex gap-2 items-center flex-wrap">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="rgb(33, 118, 255)"
                            className="size-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                            />
                        </svg>

                        {/* Email as a clickable mailto link */}
                        <a
                            href={`mailto:${userDetails.email}`}
                            className="icon-text text-custom-blue"
                        >
                            {userDetails.email}
                        </a>
                    </div>

                    {userDetails?.websiteUrl !== "" && (
                        <div className="flex gap-2 items-center flex-wrap">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="rgb(33, 118, 255)"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                />
                            </svg>

                            <h1 className="icon-text">
                                <a href={userDetails.websiteUrl}>{userDetails.websiteUrl}</a>
                            </h1>
                        </div>
                    )}

                    {userDetails?.linkedinUrl !== "" && (
                        <div className="flex gap-2 items-center flex-wrap">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="rgb(33, 118, 255)"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                                />
                            </svg>
                            <h1 className="icon-text">
                                <a href={userDetails.linkedInUrl}>{userDetails.linkedinUrl}</a>
                            </h1>
                        </div>
                    )}

                    {userDetails?.meetingLink !== "" && (
                        <div className="flex gap-2 items-center flex-wrap">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="rgb(33, 118, 255)"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                                />
                            </svg>

                            <h1 className="icon-text">
                                {" "}
                                <a href={userDetails.meetingLink}>{userDetails.meetingLink}</a>
                            </h1>
                        </div>
                    )}

                    {userDetails?.companyAddress !== "" && (
                        <div className="flex gap-2 items-center flex-wrap">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="rgb(33, 118, 255)"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                />
                            </svg>

                            <h1 className="icon-text">{userDetails.companyAddress}</h1>
                        </div>
                    )}

                    <div>
                        <div className="flex gap-2 items-center flex-wrap ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="rgb(33, 118, 255)"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>

                            <h1 className="icon-text">
                                Member Since {FormatRawDate(userDetails)}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="left-siderbar-buttons-container">
          <button
            className="candidate-secondary-btn w-full"
            onClick={() => setSettingsOn(true)}
          >
            Edit Settings
          </button>
          {settingsOn && (
            <DialogBox setShow={setSettingsOn} show={settingsOn}>
              <Settings
                handleInputChange={handleInputChange}
                setShow={setSettingsOn}
                userDetails={userDetails}
              />
            </DialogBox>
          )}
  
          <button
            className="candidate-secondary-btn w-full mt-5"
            onClick={() => setExpOn(true)}
          >
            Edit Experience
          </button>
          {expOn && (
            <DialogBox setShow={setExpOn} show={expOn}>
              <Experience
                handleInputChange={handleInputChange}
                setShow={setExpOn}
                userDetails={userDetails}
              />
            </DialogBox>
          )}
  
          <button
            className="candidate-secondary-btn w-full mt-5"
            onClick={() => setDealOn(true)}
          >
            Edit Deal and Activity Settings
          </button>
          {expOn && (
            <DialogBox setShow={setDealOn} show={dealOn}>
              <DealActivity
                handleInputChange={handleInputChange}
                setShow={setDealOn}
                userDetails={userDetails}
              />
            </DialogBox>
          )}
        </div> */}

            {successMsg && (
                <p className="mt-3 border-2 border-green-800 text-green-800 p-4 flex items-center justify-between">
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
            {haveChanges && (
                <button
                    disabled={loading}
                    className="candidate-btn w-50 mt-5 absolute bottom-0"
                    onClick={handleSubmit}
                >
                    {loading ? "Loading..." : "Save your profile information"}
                </button>
            )}
        </div>
    );
};

export default LeftSideBarProfile;