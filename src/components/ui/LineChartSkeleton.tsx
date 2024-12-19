import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import Card from './Card';

const LineChartSkeleton = () => {
    return (
        <Card >
            {/* Header */}
            <div className="flex justify-center items-center mb-4">
                <Skeleton className="h-6 w-1/2 rounded-lg" />
            </div>

            {/* Chart Skeleton */}
            <div className="relative h-72 flex">
                {/* Y-axis values */}
                <div className="flex flex-col justify-between items-end pr-2">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="h-4 w-6 rounded-lg"
                        />
                    ))}
                </div>

                {/* Y-axis lines */}
                <div className="relative flex-1">
                    {[...Array(6)].map((_, index) => (
                        <Skeleton
                            key={index}
                            className="absolute left-0 h-1 w-full bg-gray-300"
                            style={{ top: `${index * 18}%` }}
                        />
                    ))}

                    {/* X-axis labels */}
                    <div className="absolute bottom-0 flex justify-between w-full px-2">
                        {[...Array(12)].map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-4 w-4 rounded"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default LineChartSkeleton;
