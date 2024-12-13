import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

const CandidateListSkeleton = () => {
    return (
        <div className="bg-white">

            {/* Tabs */}
            <div className="flex space-x-1 mb-4">
                {[...Array(4)].map((_, index) => (
                    <Skeleton key={index} className="h-12 w-1/4" />
                ))}
            </div>

            {/* Cards */}
            <div className="grid grid-cols-4 gap-4 p-3">
                {[...Array(20)].map((_, index) => (
                    <div key={index} className="p-4 border rounded-md shadow-md">
                        <Skeleton className="h-6 w-1/2 mb-2 rounded-lg" />
                        <Skeleton className="h-4 w-3/4 mb-2 rounded-lg" />
                        <Skeleton className="h-4 w-1/3 mb-2 rounded-lg " />
                        <Skeleton className="h-4 w-full rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidateListSkeleton;
