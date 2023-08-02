// DriverAPI.js
import axios from "axios";
import Config from "./Config";

// Fetch driver data from the API
export const getDrivers = async () => {
  try {
    const response = await axios.get(
      `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a driver
export const deleteDriver = async (deleteDriverIdNumber) => {
  try {
    const response = await axios.delete(
      `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}/${deleteDriverIdNumber}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update a driver
export const updateDriver = async (driverIdNumber, updatedDriver) => {
  try {
    const response = await axios.put(
      `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}`,
      updatedDriver
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create a new driver
export const createDriver = async (newDriver) => {
  try {
    const response = await axios.post(
      `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}`,
      newDriver
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
