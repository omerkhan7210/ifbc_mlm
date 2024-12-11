import React from 'react'

const HandleError = ({ type }) => {
    if (type !== '') {
        switch (type) {
            case 'capValue':
                return `Captcha is required!`
            case 'username':
                return `Invalid username. It should be 3-16 characters long and can include
              letters, numbers, underscores, and spaces.`
            case 'city':
                return `Invalid city name! It should be 3-16 characters long and can include
                      letters, numbers, underscores, and spaces.`
            case 'companyname':
                return `Invalid company name. It should be 3-16 characters long and can include
                      letters, numbers, underscores, and spaces.`
            case 'franchisename':
                return `Invalid franchise name. It should be 3-16 characters long and can include
                                      letters, numbers, underscores, and spaces.`
            case 'location':
                return `Invalid location. It should be 3-16 characters long and can include
          letters, numbers, underscores, and spaces.`
            case 'refemail':
                return `Candidate email and your email cannot be the same!`
            case 'applyemail':
                return `Business Partner email and candidate email cannot be the same!`
            case 'applyphone':
                return `Business Partner phone number and candidate phone number cannot be the same!`

            case 'sameasbrokerphone':
                return `Candidate phone number and your phone number cannot be the same!`

            case 'sameasrefphone':
                return `Candidate phone number and consultant referral phone number cannot be the same!`

            case 'sameasrefemail':
                return `Candidate email and consultant referral email cannot be the same!`

            case 'sameasbrokeremail':
                return `Candidate email and your email cannot be the same!`

            case 'applyadditionalFirstName':
                return `To provide business partner details you must also provide his/her name`

            case 'email':
                return `Invalid Email (john@example.com)`
            case 'additionalEmail':
                return `Invalid Email (john@example.com)`
            case 'additionalPhone':
                return `Invalid phone number`
            case 'phone':
                return `Invalid phone number`
            case 'referralphone':
                return `Candidate phone and your phone cannot be the same!`

            case 'password':
                return `Password must be at least 8 characters long and include at least one
              uppercase letter, one lowercase letter, one number, and one special
              character.`

            case 'confirmpassword':
                return `Passwords don't match!`

            case 'zipcode':
                return `Invalid zipcode. It should be 5 digits long!`

            case 'emptyfields':
                return `Please fill in all the required fields`
            case 'geographical':
                return `Invalid geographical area`
            case 'street':
                return `Invalid street address`

            case 'linkedInUrl':
                return `Invalid LinkedIn URL. Ensure it starts with 'linkedin.com/in/' or 'linkedin.com/company/'`

            case 'websiteUrl':
                return `Invalid website URL. Ensure it starts with http/https and has a valid domain name.`

            case 'meetingLink':
                return `Invalid meeting URL. Supported platforms are Zoom, Google Meet, and Microsoft Teams.`
            case 'casename':
                return `Invalid casename. It should be 3-16 characters long and can include
              letters, numbers, underscores, and spaces.`
            default:
                return 'Unknown error type!'
        }
    }
}
export const ErrorMsg = ({ type, formErrors, name, check }) => {
    if (!formErrors || !formErrors[name]) return null

    return (
        formErrors?.error &&
        formErrors[name] === check && (
            <p className="py-2 text-red-700 text-xs">
                <HandleError type={type} />
            </p>
        )
    )
}
export const MainErrorMsg = ({ formErrors }) => {
    return (
        formErrors?.error && (
            <p className="border-2 border-red-600 text-red-600 rounded-xl p-4 flex justify-between items-center">
                {formErrors?.error}
            </p>
        )
    )
}