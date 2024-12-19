import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { useAuth } from '@/auth'


const ReferralLinkTable = () => {

    const { user } = useAuth()
    const [copiedIndex, setCopiedIndex] = useState(null);

    const copyToClipboard = (text) => {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        // alert('Copied to clipboard!');
    };

    const filteredCandidates = [
        {
            Home: `ifbc.co/${user?.username}`,
            ApplyNow: `ifbc.co/${user?.username}/apply-now`,
            Login: `ifbc.co/${user?.username}/login`,
            ConsultantSingUp: `ifbc.co/${user?.username}/consultant/signup`,
            SearchFranchises: `ifbc.co/${user?.username}/search-franchises`,
            FranchisesOwner: `ifbc.co/${user?.username}/franchise-owner`,
            TermsConditions: `ifbc.co/${user?.username}/terms-conditions`,
            Become_A_Consultant: `ifbc.co/${user?.username}/become-a-consultant`,
            Make_A_Referral: `ifbc.co/${user?.username}/make-a-referral`,
            Privicy_Policy: `ifbc.co/${user?.username}/privacy-policy`,
            BecomeConsultant: `ifbc.co/${user?.username}/become-consultant`,
            FundingCalculator: `ifbc.co/${user?.username}/funding-calculator`,
            FAQ: `ifbc.co/${user?.username}/faq`,
            Contact: `ifbc.co/${user?.username}/contact`,
            HelpRequest: `ifbc.co/${user?.username}/help-request`,
            BusinessAssessMent: `ifbc.co/${user?.username}/business-assessment`,
            Create_New_Account: `ifbc.co/${user?.username}/create-new-account`,
            ConsultantSingUp: `ifbc.co/${user?.username}/consultant/signup`,
            E2_Visa: `ifbc.co/${user?.username}/e2-visa`,
            E2_Visa_Form: `ifbc.co/${user?.username}/e2-visa-form`,
            AmbassadorSingUp: `ifbc.co/${user?.username}/ambassador/signup`,
            Plans: `ifbc.co/${user?.username}/plans`,
            Subscription: `ifbc.co/${user?.username}/subscription`,
            Franchise_Your_Bussiness: `ifbc.co/${user?.username}/franchise-your-business`,
            Franchise_Bussiness_Form: `ifbc.co/${user?.username}/franchise-business-form`,
        }
    ];

    return (
        <div>
            {/* Table to display the names, URLs, and copy icons */}
            <table className="table-auto w-[100%] mt-5 border-collapse">
                <thead>
                    <tr>
                        <th className="text-start font-extrabold px-2 py-1 border-b-2">S.No</th>
                        <th className="text-start font-extrabold px-2 py-1 border-b-2">Page Name</th>
                        <th className="text-start font-extrabold px-2 py-1 border-b-2">Page Links</th>
                        <th className="text-start font-extrabold px-2 py-1 border-b-2">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {Object.entries(filteredCandidates[0]).map(([key, value], index) => (
                        <tr key={key}>
                            <td className="border-b px-2 py-2">{index + 1}</td>
                            <td className="border-b px-2 py-5 font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
                            <td className="border-b px-2 py-2 text-blue-600 underline">{value}</td>
                            <td className="border-b px-2 py-2">
                                <button
                                    onClick={() => {
                                        copyToClipboard(value);
                                        setCopiedIndex(index);
                                        setTimeout(() => setCopiedIndex(null), 2000);
                                    }}
                                    className={copiedIndex === index ? "text-blue-100" : "text-blue-500"}
                                >
                                    <FaCopy />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default ReferralLinkTable;
