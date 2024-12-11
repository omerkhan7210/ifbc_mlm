import axios from 'axios'
import {
    BASE_API_URL,
    HEADER_TOKEN,
    USER_TOKEN,
} from '@/constants/app.constant'

export const ValidateHuman = async (token) => {
    try {
        // Send token to backend
        const response = await axios.post(
            `${BASE_API_URL}/recaptcha/verify`,
            { token },
            {
                headers: {
                    'X-App-Token': HEADER_TOKEN,
                },
            },
        )

        return response.data
    } catch (error) {
        console.error('Error verifying reCAPTCHA', error)
        return null
    }
}

export const captchaSubmit = async (e, reCaptchaRef) => {
    e.preventDefault()
    const token = await reCaptchaRef.current.executeAsync()

    reCaptchaRef.current.reset() // reset reCAPTCHA after getting the token
    const data = await ValidateHuman(token)
    return data
}
