import React from 'react'

interface FitlerHandlerProps {
    searchQuery?: string;
    setSearchQuery?: (val: string) => void;
    itemsPerPage?: number;
    handleItemsPerPageChange?: (e: any) => void;
    placeholder: string;
    noOfItems: number;

}

export default function FiltersHandler({ searchQuery, setSearchQuery, handleItemsPerPageChange, itemsPerPage, placeholder, noOfItems }: FitlerHandlerProps) {
    return (
        <div className="mb-4 flex justify-between items-center flex-wrap gap-5">
            {/* Search Input */}
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={placeholder}
                className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-2/4"
            />

            {/* Items Per Page Selector */}
            {noOfItems > itemsPerPage && <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e)}
                className="p-3 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto "
                style={{ minWidth: '150px', textAlign: 'center' }}
            >
                <option value={6}>6 Items per Page</option>
                <option value={9}>9 Items per Page</option>
                <option value={12}>12 Items per Page</option>
                <option value={15}>15 Items per Page</option>
            </select>}
        </div>
    )
}
