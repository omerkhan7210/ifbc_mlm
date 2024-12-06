import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";
// import { useQuery } from "react-query";
import { useQuery } from '@tanstack/react-query';
// import { useSelector } from "react-redux";
import { BASE_API_URL, HEADER_TOKEN } from '@/constants/app.constant'
// import { addAllCandidates } from "src/Redux/listingReducer";
import { useSessionUser, useToken } from '@/store/authStore'
export const MyCandContext = createContext();

const CandidatesDataContext = ({ children }) => {
    //const reduxCands = useSelector((state) => state.counter.candidates);
    //const [loading, setLoading] = useState(false);

    // const token = useSelector((state) => state.counter.token);
    // const userDetails = useSelector((state) => state.counter.userDetails);

    // const [loadingError, setLoadingError] = useState(false);

    const { token } = useToken()
    const { user } = useAuth()
    console.log(token , "token")

    console.log(token, user, "authentication ")

    const role =
        userDetails && typeof userDetails === "object"
            ? userDetails.userType
            : null;
    //const dispatch = useDispatch();

    const fetchCandProfile = useCallback(() => {
        const url = `${BASE_API_URL}/candidateprofile`;

        return axios.get(url, {
            headers: {
                "X-App-Token": HEADER_TOKEN,
            },
        });
    }, [role]);

    const {
        data: cands,
        isLoading,
        error,
        refetch,
    } = useQuery(["CANDIDATES"], fetchCandProfile, {
        select: (data) => {
            if (data) {
                // Determine if the user is an admin
                const isAdmin = userDetails?.docId === 87;

                const filtered = data?.data?.filter((cand) => {
                    if (isAdmin) {
                        return true;
                    }
                    // Otherwise, filter based on agentUserId
                    return cand?.agentUserId === userDetails?.userId;
                });
                return filtered;
            }
        },
    });

    return (
        <MyCandContext.Provider
            value={{
                // graphRole
                role,
                cands: isLoading ? [] : cands,
                loading: isLoading,
                loadingError: error,
                userDetails,
                token,
                refetch,
            }}
        >
            {children}
        </MyCandContext.Provider>
    );
};

export default CandidatesDataContext;
