import { motion } from "framer-motion";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyCandContext } from "src/Context/CandidatesDataContext";
import { MyContext } from "src/Context/ListingDataContext";
import ScrollToTop from "src/Globals/UtilSections/ScrollToTop";
import becomeconsultantanimation from "src/assets/images/json/becomeconsultantanimation.json"; // Replace with your
import applynowanimation from "src/assets/images/json/applynowanimation.json"; // Replace with your Lottie file path
import e2animation from "src/assets/images/json/e2animation.json"; // Replace with your Lottie file path
import fundinganimation from "src/assets/images/json/fundinganimation.json"; // Replace with your Lottie file path
import loaderAnimation from "src/assets/images/json/bookloader.json"; // Replace with your Lottie file path
import searchingLoadingAnimation from "src/assets/images/json/searching.json"; // Replace with your Lottie file path
import candidateLoadingAnimation from "src/assets/images/json/candlistanimation.json"; // Replace with your Lottie file path
import businessassessmentanimation from "src/assets/images/json/businessassessmentanimation.json"; // Replace with your Lottie file path
import Lottie from "lottie-react";
import { MyTCFRContext } from "src/Context/TCFRDataContext";

const PageTransition = ({ children, isLoading, loaderGif }) => {
    const { loading, loadingError } = useContext(MyContext) ||
        useContext(MyCandContext) ||
        useContext(MyTCFRContext) ||
        isLoading || { loading: false }; // Default to false if loading is undefined
    const navigate = useNavigate();

    useEffect(() => {
        if (loadingError) {
            document.querySelector("html").style.overflow = "auto";
            document.querySelector("html").style.height = "auto";

            navigate("/error");
        }
    }, [loadingError, navigate]);
    const variants = {
        initial: {
            scaleY: 1,
        },
        animate: {
            scaleY: loading ? [1, 1, 1, 0] : [1, 1, 1, 0],
            //scaleY: [0, 1, 1, 0],
        },
    };

    const getAnimationData = (loaderGif) => {
        switch (loaderGif) {
            case "bookloader":
                return loaderAnimation;
            case "searchingLoadingAnimation":
                return searchingLoadingAnimation;
            case "candidates":
                return candidateLoadingAnimation;
            case "e2animation":
                return e2animation;
            case "funding":
                return fundinganimation;
            case "applynow":
                return applynowanimation;
            case "becomeconsultant":
                return becomeconsultantanimation;
            case "businessassessment":
                return businessassessmentanimation;
            // default:
            //   return defaultAnimation; // Optional: Fallback animation
        }
    };

    return (
        <>
            <ScrollToTop />
            {children}
            <motion.div
                className="origin-bottom h-full w-full fixed top-0 left-0 z-[99999999] bg-custom-heading-color"
                variants={variants}
                initial="initial"
                animate="animate"
                transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                <div
                    id="image-container-transition"
                    className="h-screen w-full grid place-items-center sticky top-0"
                >
                    {loaderGif ? (
                        <Lottie
                            animationData={getAnimationData(loaderGif)}
                            loop={true}
                            style={{ width: "300px", height: "300px" }} // Size control via style
                        />
                    ) : (
                        <motion.img
                            animate={{
                                opacity: [0, 1, 1, 0],
                                transition: { duration: 1, delay: 0.1 },
                            }}
                            src="/images/logo/IFBC 3.png"
                            alt="International Franchise Business Consultant Corp."
                            className="w-72 md:w-96"
                        />
                    )}
                </div>
            </motion.div>
        </>
    );
};

export default PageTransition;