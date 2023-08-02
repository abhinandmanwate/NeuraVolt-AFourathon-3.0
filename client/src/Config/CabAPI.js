// CabAPI.js

import axios from "axios";
import Config from "./Config";

// Fetch all cabs from the API
export const getCabs = async () => {
  try {
    const response = await axios.get(
      `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a cab from the API
export const deleteCab = async (cabRegistrationNumber) => {
  try {
    const response = await axios.delete(
      `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}/${cabRegistrationNumber}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Create a new cab in the API
export const createCab = async (newCabData) => {
  try {
    const response = await axios.post(
      `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}`,
      newCabData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update an existing cab in the API
export const updateCab = async (cabRegistrationNumber, updatedCabData) => {
  try {
    const response = await axios.put(
      `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiCab}`,
      updatedCabData
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
