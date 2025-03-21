// Save services to local storage
function save(services) {
    localStorage.setItem("services", JSON.stringify(services));
}

// Read services from local storage
function readServices() {
    let storeData = localStorage.getItem("services");

    // If there's no data, return an empty array
    if (storeData == null) {
        return [];
    }

    try {
        // Attempt to parse the data as JSON
        return JSON.parse(storeData);
    } catch (error) {
        // If parsing fails, log the error and return an empty array
        console.error("Error parsing services from localStorage:", error);
        return [];
    }
}