import axios from 'axios'
import {
    BASE_API_URL,
    HEADER_TOKEN,
    USER_TOKEN,
} from '@/constants/app.constant'

const defaultHeaders = {
    'X-App-Token': HEADER_TOKEN,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${USER_TOKEN}`,
}

// Utility function to make GET requests
// @param {string} endpoint - API endpoint
// @param {object} config - Additional axios config (optional)
// @returns {Promise<object>} - Response data
export const getData = async (
    endpoint: string,
    config: object = {},
): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_API_URL}/${endpoint}`, {
            headers: defaultHeaders,
            ...config,
        })
        return response.data
    } catch (error) {
        console.error('GET request failed:', error)
        throw error
    }
}

// Utility function to make POST requests
// @param {string} endpoint - API endpoint
// @param {object} data - Data to send in the request body
// @param {object} config - Additional axios config (optional)
// @returns {Promise<object>} - Response data
export const postData = async (
    endpoint: string,
    data: object,
    config: object = {},
): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_API_URL}/${endpoint}`, data, {
            headers: defaultHeaders,
            ...config,
        })
        return response.data
    } catch (error) {
        console.error('POST request failed:', error)
        throw error
    }
}

// Utility function to make PUT requests
// @param {string} endpoint - API endpoint
// @param {object} data - Data to send in the request body
// @param {object} config - Additional axios config (optional)
// @returns {Promise<object>} - Response data
export const putData = async (
    endpoint: string,
    data: object,
    config: object = {},
): Promise<any> => {
    try {
        const response = await axios.put(`${BASE_API_URL}/${endpoint}`, data, {
            headers: defaultHeaders,
            ...config,
        })
        return response.data
    } catch (error) {
        console.error('PUT request failed:', error)
        throw error
    }
}

// Utility function to make DELETE requests
// @param {string} endpoint - API endpoint
// @param {object} config - Additional axios config (optional)
// @returns {Promise<object>} - Response data
export const deleteData = async (
    endpoint: string,
    config: object = {},
): Promise<any> => {
    try {
        const response = await axios.delete(`${BASE_API_URL}/${endpoint}`, {
            headers: defaultHeaders,
            ...config,
        })
        return response.data
    } catch (error) {
        console.error('DELETE request failed:', error)
        throw error
    }
}

// Example usage

// GET request example
//Get users

// getData('users')
//     .then(data => console.log('User list:', data))
//     .catch(error => console.error('Error fetching users:', error));

// POST request example
// Add a new user

// const newUser = { name: 'Alice Smith', email: 'alice@example.com' };
// postData('users', newUser)
//     .then(response => console.log('User added:', response))
//     .catch(error => console.error('Error adding user:', error));

// PUT request example
// Update user details

// const updatedUser = { name: 'Alice Smith', email: 'alice.smith@example.com' };
// putData('users/1', updatedUser)
//     .then(response => console.log('User updated:', response))
//     .catch(error => console.error('Error updating user:', error));

// DELETE request example
// Remove a user by ID

// deleteData('users/1')
//     .then(response => console.log('User deleted:', response))
//     .catch(error => console.error('Error deleting user:', error));
