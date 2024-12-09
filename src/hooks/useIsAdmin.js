// useIsAdmin.js
import { useAuth } from '@/auth';

/**
 * Custom hook to check if the logged-in user is an admin.
 * @returns {boolean} - Returns true if the logged-in user is an admin, otherwise false.
 */
const useIsAdmin = () => {
    const { user } = useAuth();

    // Check if the user is an admin based on their userId
    return user?.docId === 87;
};


export default useIsAdmin;
