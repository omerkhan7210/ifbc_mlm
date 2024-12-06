export const formatDateCustom = (dateString: string): string => {
    if (!dateString) return "Invalid date"; // Handle empty or invalid input

    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        // timeZone: "America/Los_Angeles", 
        // timeZoneName: "short", 
    });
};





