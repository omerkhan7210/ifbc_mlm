import axios from "axios";
import React, { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Recaptcha = ({ reCaptchaRef }) => {
    return (
        <ReCAPTCHA
            sitekey="6LfYQ0kqAAAAAHXHvpSKNrXuH1YTsCZ32fs7Qn1R"
            size="invisible"
            ref={reCaptchaRef}
            className="flex justify-center"
        />
    );
};

export default Recaptcha;