import React from 'react';
import Skeleton from '@/components/ui/Skeleton';

const CardSkeleton = () => {
    return (
        <div className="p-4 border rounded-md shadow-md">
            <div className="flex justify-between items-center mb-3">
                <Skeleton className="w-1/2 h-6" />
                <Skeleton className="w-16 h-6" />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="w-6 h-6" variant="circle" />
                    <Skeleton className="w-full h-4" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="w-6 h-6" variant="circle" />
                    <Skeleton className="w-full h-4" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="w-6 h-6" variant="circle" />
                    <Skeleton className="w-full h-4" />
                </div>
            </div>
        </div>
    );
};

export default CardSkeleton;
