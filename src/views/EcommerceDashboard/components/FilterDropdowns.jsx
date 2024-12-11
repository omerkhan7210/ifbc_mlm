import { useState, useEffect, useRef } from "react";
import DateSliderButtons from "../../../../src/GlobalPageSections/DateSliderFilter";
import FilteredList from "../../../../src/GlobalPageSections/FilteredList";
// import { MultiSelect } from "primereact/multiselect";
import { steps } from '../../../utils/staticdata/data.js'

const FilterDropdowns = ({
    filterCands,
    setFilterCands,
    selectedFranchises,
    setSelectedFranchises,
    listingNames,
    consultantDetails,
    role,
}) => {

    console.log(filterCands,
        // setFilterCands,
        selectedFranchises,
        // setSelectedFranchises,
        listingNames,
        consultantDetails, "tepmmm")
    const keyMappings = {
        docDate: "Worked On:",
        franchise: "Interested Franchises:",
        status: "Deal Stage:",
        search: "Keyword:",
        isArchive: "Archived Candidates",
        selectedApprovalStatus: "Status:",
        isDeleted: "Deleted Candidates",
        consultantid: "Selected Consultant:",
        selectedRange: "Selected Date Range:",
        referralStatus: "Source:",
    };
    const isConsultantFilter = Object.keys(consultantDetails || {}).length > 0;
    const [selectedName, setSelectedName] = useState("");

    useEffect(() => {
        const consultantName = consultantDetails.find(
            (c) => c.docId == filterCands?.consultantid
        );
        const filteredC = consultantName?.name;
        setSelectedName(filteredC);
    }, [consultantDetails, filterCands]);

    // Utility function to format timestamp into YYYY-MM-DD
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const [showDateSlider, setShowDateSlider] = useState(false); // State to control visibility

    const toggleDateSlider = (e, time) => {
        e.stopPropagation();

        setShowDateSlider((prev) => {
            const newState = { start: false, end: false }; // Close both initially
            return { ...newState, [time]: !prev[time] }; // Open the clicked one
        });
    };

    const sources = ["Referred Candidates", "Self-Applicants"];

    return (
        <div className="flex justify-between items-center flex-col gap-3">
            <FilteredList
                filterCands={filterCands}
                formatDate={formatDate}
                keyMappings={keyMappings}
                selectedName={selectedName}
                setFilterCands={setFilterCands}
                setSelectedFranchises={setSelectedFranchises}
            />

            <div
                id="cand-list-top"
                className={`md:grid md:grid-cols-4 gap-5 max-md:flex flex-col  w-full`}
            >
                {/* searching filter */}
                <div className="flex items-center ">
                    <SearchingInput
                        setFilterCands={setFilterCands}
                        filterCands={filterCands}
                    />
                </div>

                {/* consultant filter */}
                {isConsultantFilter && (
                    <select
                        className="candidate-select capitalize"
                        name="consultants"
                        onChange={(e) =>
                            setFilterCands((prev) => ({
                                ...prev,
                                consultantid: e.target.value,
                            }))
                        }
                    >
                        <option value="" disabled={filterCands?.consultantid}>
                            Select Consultants
                        </option>{" "}
                        <option value="">All Consultants</option>
                        {consultantDetails.map((c, index) => (
                            <option
                                key={index}
                                value={c.docId}
                                selected={parseInt(filterCands?.consultantid) === c.docId}
                            >
                                {c.name}
                            </option>
                        ))}
                    </select>
                )}

                {/* deal stage filter */}
                <select
                    className="candidate-select"
                    name="steps"
                    onChange={(e) =>
                        setFilterCands((prev) => ({
                            ...prev,
                            status: e.target.value,
                        }))
                    }
                >
                    <option value="" selected disabled>
                        Select a Deal Stage
                    </option>
                    <option value="" selected>
                        All Deal Stages
                    </option>
                    {steps.map((step, index) => (
                        <option
                            key={index}
                            value={step}
                            selected={filterCands?.status === step}
                        >
                            {step}
                        </option>
                    ))}
                </select>

                {/* source filter */}
                <select
                    className="candidate-select"
                    name="sources"
                    onChange={(e) =>
                        setFilterCands((prev) => ({
                            ...prev,
                            referralStatus: e.target.value,
                        }))
                    }
                >
                    <option value="" selected disabled>
                        Select a Source
                    </option>
                    <option value="" selected>
                        All Sources
                    </option>
                    {sources.map((source, index) => (
                        <option
                            key={index}
                            value={source}
                            selected={filterCands?.referralStatus === source}
                        >
                            {source}
                        </option>
                    ))}
                </select>

                {/* <MultiSelect
                    value={selectedFranchises}
                    onChange={(e) => {
                        setFilterCands((prev) => ({
                            ...prev,
                            franchise: e.value,
                        }));
                        setSelectedFranchises(e.value);
                    }}
                    options={[...listingNames, { docid: 0, name: "Others" }]}
                    optionLabel="name"
                    filter
                    placeholder="Select a Franchise"
                    className=" candidate-select w-full flex p-0"
                    showSelectAll={false}
                /> */}

                <DateSliderButtons
                    filterCands={filterCands}
                    setFilterCands={setFilterCands}
                    formatDate={formatDate}
                    setShowDateSlider={setShowDateSlider}
                    showDateSlider={showDateSlider}
                    toggleDateSlider={toggleDateSlider}
                />

                <select
                    className="candidate-select"
                    value={filterCands?.selectedApprovalStatus}
                    onChange={(e) =>
                        setFilterCands((prev) => ({
                            ...prev,
                            selectedApprovalStatus: e.target.value,
                        }))
                    }
                >
                    <option value="">All Status</option>

                    <option value="isArchive">Archived Candidates</option>
                    <option value="isDeleted">Deleted Candidates</option>
                </select>
            </div>
        </div>
    );
};

const SearchingInput = ({ setFilterCands, filterCands }) => {
    const ref = useRef();

    const handleSearchInputChange = () => {
        const keyword = ref.current.value;
        // Update the filters state with the search keyword
        setFilterCands({
            ...filterCands,
            search: keyword,
        });
    };
    return (
        <div className="relative w-full">
            <input
                type="search"
                id="search-field"
                placeholder="Search Any Candidate"
                value={filterCands?.search}
                ref={ref}
                onChange={handleSearchInputChange}
                className="candidate-input w-full"
            />

            <button
                className=" absolute right-2.5 top-3.5 w-4 h-4"
                onClick={handleSearchInputChange}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    viewBox="0 0 487.95 487.95"
                >
                    <path d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"></path>
                </svg>
            </button>
        </div>
    );
};

export default FilterDropdowns;
