import { useState } from 'react';
import { Pagination } from '@/components/ui';

interface PaginationHandlerProps {
    items: any[];
    itemsPerPage: number;
    children: (paginatedItems: any[]) => React.ReactNode;
}

export default function PaginationHandler({ items, itemsPerPage, children }: PaginationHandlerProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    // const itemsPerPage = 9; // Fixed items per page, can be parameterized if needed

    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Get paginated items for the current page
    const paginatedItems = items?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {children(paginatedItems)}
            <div className="flex justify-center mt-3">
                {items.length > itemsPerPage && <Pagination
                    currentPage={currentPage}
                    total={totalItems}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                />
                }
            </div>
        </div>
    );
}
