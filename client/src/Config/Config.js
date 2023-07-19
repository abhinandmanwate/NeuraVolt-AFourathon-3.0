/**
 * Config object containing configuration parameters for the API endpoints and entities.
 * Modify these values based on your server setup and API endpoints.
 */
const Config = {
  // Protocol used to make API requests (e.g., "http", "https")
  apiRequest: "http",

  // Host address of the API server
  apiHost: "65.1.211.114",

  // Port number on which the API server is running
  apiPort: "8080",

  // API endpoint for cab-related operations
  apiCab: "cabapi",

  // API endpoint for driver-related operations
  apiDriver: "driverapi",

  // Key used to represent cabs in API requests (e.g., "/cab/<cabRegistrationNumber>")
  cab: "cab",

  // Key used to represent drivers in API requests (e.g., "/driver/<driverIdNumber>")
  driver: "driver",
};

export default Config;
