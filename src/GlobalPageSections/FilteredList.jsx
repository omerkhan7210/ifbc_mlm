const renderFilterItem = (
    key,
    filterCands,
    keyMappings,
    selectedName,
    cands,
    setFilterCands,
    formatDate,
    setSelectedFranchises
) => {
    const deleteFilterItem = () => {
        setSelectedFranchises([]);
        const updatedFilterCands = { ...filterCands };
        delete updatedFilterCands[key]; // Non-mutating delete
        setFilterCands(updatedFilterCands);
    };

    const renderFilterValue = () => {
        switch (key) {
            case "selectedApprovalStatus":
                if (filterCands[key] === "isDeleted") {
                    return `${keyMappings[key]} Deleted`;
                } else if (filterCands[key] === "isArchive") {
                    return `${keyMappings[key]} Archived`;
                }

            case "franchise":
                if (filterCands[key].length !== 0) {
                    return `${keyMappings[key]}: ${filterCands[key].map((listing) => listing.name).join(", ")}`;
                } else {
                    delete filterCands[key];
                }
            case "consultantid":
                return `${keyMappings[key]} : ${selectedName}`;
            case "selectedRange":
                const startDate = filterCands.selectedRange.startDate
                    ? formatDate(filterCands.selectedRange.startDate)
                    : "";
                const endDate = filterCands.selectedRange.endDate
                    ? formatDate(filterCands.selectedRange.endDate)
                    : "";
                if (startDate === endDate) return `${keyMappings[key]} ${startDate}`;
                if (startDate && !endDate) return `${keyMappings[key]} ${startDate}`;
                if (!startDate && endDate) return `${keyMappings[key]} ${endDate}`;
                if (startDate && endDate)
                    return `${keyMappings[key]} ${startDate} to ${endDate}`;

            case "type":
                return `${keyMappings[key]} ${filterCands[key] === "TC" ? "Territory Check" : "Formal Registration"}`;
            case "selectedCands":
                const selectedCand = cands.find(
                    (c) => c.docid === parseInt(filterCands[key])
                );
                return `${keyMappings[key]} ${selectedCand?.name || ""}`;
            case "isArchive":
                return "Archived Candidates"; // Skip rendering if it's "isArchive"
            default:
                return `${keyMappings[key]} ${filterCands[key]}`;
        }
    };

    return (
        <li
            key={key}
            className="bg-custom-orange/70 py-2 px-4 gap-3 rounded-xl md:flex justify-between relative max-md:flex-col"
        >
            <p className="text-sm capitalize">{renderFilterValue()}</p>
            <button onClick={deleteFilterItem}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="w-4 h-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </svg>
            </button>
        </li>
    );
};

const FilteredList = ({
    filterCands,
    keyMappings,
    selectedName,
    cands,
    setFilterCands,
    formatDate,
    setSelectedFranchises,
}) => {
    const isfilterCandsAvail =
        Object.keys(filterCands || {}).length > 0 &&
        Object.values(filterCands).some((val) => val !== "");

    return (
        isfilterCandsAvail && (
            <ul className="flex flex-col md:flex-row md:gap-3 gap-2 flex-wrap">
                {Object.keys(filterCands).map(
                    (key) =>
                        filterCands[key] &&
                        filterCands[key] !== "" &&
                        renderFilterItem(
                            key,
                            filterCands,
                            keyMappings,
                            selectedName,
                            cands,
                            setFilterCands,
                            formatDate,
                            setSelectedFranchises
                        )
                )}
            </ul>
        )
    );
};

export default FilteredList;
