import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { useAuth } from '@/auth';
import ReferralLink1 from "/AllReferralLinkImages/ReferralLink1.PNG";
import ReferralLink2 from "/AllReferralLinkImages/ReferralLink2.PNG";
import ReferralLink3 from "/AllReferralLinkImages/ReferralLink3.PNG";
// import ReferralLink4 from "../../../public/AllReferralLinkImages/ReferralLink4.PNG";
import ReferralLink5 from "/AllReferralLinkImages/ReferralLink5.PNG";
// import ReferralLink6 from "/AllReferralLinkImages/ReferralLink6.PNG";
import ReferralLink7 from "/AllReferralLinkImages/ReferralLink7.PNG";
import ReferralLink8 from "/AllReferralLinkImages/ReferralLink8.PNG";
// import ReferralLink9 from "/AllReferralLinkImages/ReferralLink9.PNG";
// import ReferralLink10 from "/AllReferralLinkImages/ReferralLink10.PNG";
import ReferralLink11 from "/AllReferralLinkImages/ReferralLink11.PNG";
// import ReferralLink12 from "/AllReferralLinkImages/ReferralLink12.PNG";
import ReferralLink13 from "/AllReferralLinkImages/ReferralLink13.PNG";
// import ReferralLink14 from "/AllReferralLinkImages/ReferralLink14.PNG";
import ReferralLink15 from "/AllReferralLinkImages/ReferralLink15.PNG";
import ReferralLink16 from "/AllReferralLinkImages/ReferralLink16.PNG";
// import ReferralLink17 from "/AllReferralLinkImages/ReferralLink17.PNG";
// import ReferralLink18 from "/AllReferralLinkImages/ReferralLink18.PNG";
import ReferralLink19 from "/AllReferralLinkImages/ReferralLink19.PNG";
// import ReferralLink20 from "/AllReferralLinkImages/ReferralLink20.PNG";
// import ReferralLink21 from "/AllReferralLinkImages/ReferralLink21.PNG";
// import ReferralLink22 from "/AllReferralLinkImages/ReferralLink22.PNG";
// import ReferralLink23 from "/AllReferralLinkImages/ReferralLink23.PNG";
import Table from '@/components/ui/Table';

const { Tr, Td, TBody, THead, Th } = Table;

const ReferralLinkTable = () => {
    const { user } = useAuth();
    const [copiedIndex, setCopiedIndex] = useState(null);

    const copyToClipboard = (text) => {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    };

    const filteredCandidates = [
        {
            ConsultantSignUp: `ifbc.co/${user?.username}/consultant/signup`,
            AmbassadorSignUp: `ifbc.co/${user?.username}/ambassador/signup`,
            Home: `ifbc.co/${user?.username}`,
            ApplyNow: `ifbc.co/${user?.username}/apply-now`,
            // BecomeConsultant: `ifbc.co/${user?.username}/become-consultant`,
            SearchFranchises: `ifbc.co/${user?.username}/search-franchises`,
            MakeAReferral: `ifbc.co/${user?.username}/make-a-referral`,
            // Login: `ifbc.co/${user?.username}/login`,
            // FranchiseOwner: `ifbc.co/${user?.username}/franchise-owner`,
            FranchiseBusinessForm: `ifbc.co/${user?.username}/franchise-business-form`,
            // CreateNewAccount: `ifbc.co/${user?.username}/create-new-account`,
            FundingCalculator: `ifbc.co/${user?.username}/funding-calculator`,
            // TermsAndConditions: `ifbc.co/${user?.username}/terms-conditions`,
            Contact: `ifbc.co/${user?.username}/contact`,
            HelpRequest: `ifbc.co/${user?.username}/help-request`,
            // BusinessAssessment: `ifbc.co/${user?.username}/business-assessment`,
            // E2Visa: `ifbc.co/${user?.username}/e2-visa`,
            E2VisaForm: `ifbc.co/${user?.username}/e2-visa-form`,
            // Plans: `ifbc.co/${user?.username}/plans`,
            // Subscription: `ifbc.co/${user?.username}/subscription`,
            // FranchiseYourBusiness: `ifbc.co/${user?.username}/franchise-your-business`,
            // PrivacyPolicy: `ifbc.co/${user?.username}/privacy-policy`,
            images: [
                ReferralLink3, ReferralLink5, ReferralLink1, ReferralLink2, ReferralLink7, ReferralLink8,
                ReferralLink11, ReferralLink13, ReferralLink15,
                ReferralLink16, ReferralLink19
            ]
        }
    ];

    return (
        // <div>
        //     <table className="table-auto w-[100%] mt-5 border-collapse">
        //         <thead>
        //             <tr>
        //                 <th className="text-start font-extrabold px-2 py-1 border-b-2 text-[black]">S.No</th>
        //                 <th className="text-start font-extrabold px-2 py-1 border-b-2 text-[black]">Image</th>
        //                 <th className="text-start font-extrabold px-2 py-1 border-b-2 text-[black]">Page Name</th>
        //                 <th className="text-start font-extrabold px-2 py-1 border-b-2 text-[black]">Page Links</th>
        //                 <th className="text-start font-extrabold px-2 py-1 border-b-2 text-[black]">Copy</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {Object.entries(filteredCandidates[0]).map(([key, value], index) => {
        //                 if (key === "images") return null;

        //                 return (
        //                     <tr key={key}>
        //                         <td className="border-b px-2 py-2">{index + 1}</td>
        //                         <td className="border-b px-2 py-2">
        //                             <img src={filteredCandidates[0].images[index]} alt={`Referral ${index + 1}`} className="w-[120px] h-[60px] rounded-sm object-contain" />
        //                         </td>

        //                         <td className="border-b px-2 py-5 font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</td>
        //                         <td className="border-b px-2 py-2 text-blue-600 underline">{value}</td>
        //                         <td className="border-b px-2 py-2">
        //                             <button
        //                                 onClick={() => {
        //                                     copyToClipboard(value);
        //                                     setCopiedIndex(index);
        //                                     setTimeout(() => setCopiedIndex(null), 2500);
        //                                 }}
        //                                 className={copiedIndex === index ? "text-[#0071F3] bg-[white] p-2 rounded-sm" : "p-2 text-blue-100 bg-[#0071F3] rounded-md"}
        //                             >
        //                                 <FaCopy size={22} />
        //                             </button>
        //                         </td>
        //                     </tr>
        //                 );
        //             })}
        //         </tbody>
        //     </table>
        // </div>
        <div>
            <Table>
                <THead>
                    <Tr>
                        <Th>S.No</Th>
                        <Th>Image</Th>
                        <Th>Page Name</Th>
                        <Th>Page Links</Th>
                        <Th>Copy</Th>
                    </Tr>
                </THead>
                <TBody>
                    {Object.entries(filteredCandidates[0]).map(([key, value], index) => {
                        if (key === "images") return null;

                        return (
                            <Tr key={key}>
                                <Td>{index + 1}</Td>
                                <Td>
                                    <img
                                        src={filteredCandidates[0].images[index]}
                                        alt={`Referral ${index + 1}`}
                                        className="w-[120px] h-[60px] rounded-sm object-contain"
                                    />
                                </Td>
                                <Td className="font-bold">{key.replace(/([A-Z])/g, ' $1').trim()}</Td>
                                <Td className="text-blue-600 underline">{value}</Td>
                                <Td>
                                    <button
                                        onClick={() => {
                                            copyToClipboard(value);
                                            setCopiedIndex(index);
                                            setTimeout(() => setCopiedIndex(null), 2500);
                                        }}
                                        className={copiedIndex === index ? "text-[#0071F3] bg-[white] p-2 rounded-sm" : "p-2 text-blue-100 bg-[#0071F3] rounded-md"}
                                    >
                                        <FaCopy size={21} />
                                    </button>
                                </Td>
                            </Tr>
                        );
                    })}
                </TBody>
            </Table>
        </div>
    );
};

export default ReferralLinkTable;
