import { addDays } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { Calendar } from "react-date-range";

const DateSliderButtons = ({
    showDateSlider,
    filterCands,
    toggleDateSlider,
    formatDate,
    setShowDateSlider,
    setFilterCands,
}) => {
    return (
        <>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>

                {/* Start Date Button */}
                <button
                    className=" candidate-input w-full "
                    placeholder="Select date"
                    onClick={(e) => toggleDateSlider(e, "start")}
                >
                    {!filterCands?.selectedRange?.startDate && "Select Start Date"}
                    {filterCands?.selectedRange?.startDate &&
                        `${formatDate(filterCands?.selectedRange?.startDate)}`}
                </button>

                {/* Show Start Date Filter */}
                {showDateSlider?.start && (
                    <DateSliderFilter
                        showDateSlider={showDateSlider}
                        setFilterCands={setFilterCands}
                        setShowDateSlider={setShowDateSlider}
                        filterCands={filterCands}
                    />
                )}
            </div>

            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>

                {/* End Date Button */}
                <button
                    disabled={filterCands?.selectedRange?.startDate ? false : true}
                    className=" candidate-input w-full "
                    onClick={(e) => toggleDateSlider(e, "end")}
                >
                    {!filterCands?.selectedRange?.endDate && "Select End Date"}
                    {filterCands?.selectedRange?.endDate &&
                        `${formatDate(filterCands?.selectedRange?.endDate)}`}
                </button>

                {/* Show End Date Filter */}
                {showDateSlider?.end && (
                    <DateSliderFilter
                        showDateSlider={showDateSlider}
                        setFilterCands={setFilterCands}
                        setShowDateSlider={setShowDateSlider}
                        filterCands={filterCands}
                    />
                )}
            </div>
        </>
    );
};

const DateSliderFilter = ({
    setFilterCands,
    showDateSlider,
    setShowDateSlider,
    filterCands,
}) => {
    const [startDate, setStartDate] = useState(new Date()); // Initial start date
    const [endDate, setEndDate] = useState(addDays(new Date(), 0)); // Initial end date (default to one week later)
    const startRef = useRef(null); // Ref for the start calendar
    const endRef = useRef(null); // Ref for the end calendar

    // Handle changes for start date
    const handleStartDateChange = (date) => {
        setStartDate(date); // Update start date
        // Ensure the end date is not before the new start date
        if (endDate < date) {
            setEndDate(date); // Set end date to the same as the new start date
        }
        setFilterCands((prev) => ({
            ...prev,
            selectedRange: {
                ...prev?.selectedRange, // Keep the existing endDate if it exists
                startDate: date, // Update startDate
            },
        }));
        setShowDateSlider({ start: false, end: true }); // Open end date calendar
    };

    // Handle changes for end date
    const handleEndDateChange = (date) => {
        setEndDate(date); // Update end date
        setFilterCands((prev) => ({
            ...prev,
            selectedRange: {
                ...prev?.selectedRange, // Keep the existing startDate if it exists
                endDate: date, // Update endDate
            },
        }));
        setShowDateSlider({ start: false, end: false }); // Open end date calendar
    };

    const handleClickOutside = (event) => {
        if (
            startRef.current &&
            !startRef.current.contains(event.target) && // Click outside start calendar
            endRef.current &&
            !endRef.current.contains(event.target) // Click outside end calendar
        ) {
            setShowDateSlider({}); // Close both calendars
        }
    };

    // Close calendars if clicked outside
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDateSlider, setShowDateSlider]);
    return (
        <div className="absolute top-14 left-0 z-[99999] w-full flex justify-between gap-10">
            {/* Start Date Calendar */}
            {showDateSlider?.start && (
                <div ref={startRef} className="flex flex-col">
                    <h4 className="bg-white p-2 text-sm">Select Start Date</h4>
                    <Calendar date={startDate} onChange={handleStartDateChange} />
                </div>
            )}

            {/* End Date Calendar */}
            {showDateSlider?.end && (
                <div ref={endRef} className="flex flex-col">
                    {" "}
                    <h4 className="bg-white p-2 text-sm">Select End Date </h4>
                    <Calendar
                        date={endDate}
                        onChange={handleEndDateChange}
                        minDate={new Date(filterCands?.selectedRange?.startDate)} // Disable dates before the selected start date
                    />
                </div>
            )}
        </div>
    );
};

export default DateSliderButtons;
