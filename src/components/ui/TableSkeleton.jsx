import React from 'react';
import Skeleton from '@/components/ui/Skeleton';
import Table from '@/components/ui/Table';

const { Tr, Td, TBody, THead, Th } = Table;

const TableSkeleton = ({ rows = 5, columns = 5 }) => {
    return (
        <Table>
            <THead>
                <Tr>
                    {Array.from({ length: columns }).map((_, index) => (
                        <Th key={index}>
                            <Skeleton className="h-4 w-24" />
                        </Th>
                    ))}
                </Tr>
            </THead>

            {/* Table Body */}
            <TBody>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <Tr key={rowIndex}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <Td key={colIndex}>
                                <Skeleton className="h-4 w-full" />
                            </Td>
                        ))}
                    </Tr>
                ))}
            </TBody>
        </Table>
    );
};

export default TableSkeleton;