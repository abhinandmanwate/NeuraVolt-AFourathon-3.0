import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Dmodal.css";
import Config from "../../Config/Config";

const Dmodal = ({ closeModal, defaultValue }) => {
  // State to manage the form fields
  const [formState, setFormState] = useState({
    driverIdNumber: "",
    driverName: "",
    driverEmail: "",
    driverPhoneNumber: "",
  });

  // State to manage form validation errors
  const [errors, setErrors] = useState("");

  // State to track which fields have been edited
  const [editedFields, setEditedFields] = useState([]);

  // State to track whether the modal is for updating an existing driver or creating a new one
  const [isUpdate, setIsUpdate] = useState(false);

  // Function to validate the form fields
  const validateForm = () => {
    // Validation logic here
    if (
      formState.driverIdNumber &&
      formState.driverName &&
      formState.driverEmail &&
      formState.driverPhoneNumber
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  // Initialize form fields with default values when the modal is for editing
  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
      setIsUpdate(true); // Set isUpdate to true if defaultValue is provided
    }
  }, [defaultValue]);

  // Function to handle input changes in the form
  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormState({
      ...formState,
      [fieldName]: fieldValue,
    });

    // Track the edited fields for validation
    if (!editedFields.includes(fieldName)) {
      setEditedFields([...editedFields, fieldName]);
    } else {
      setEditedFields(editedFields.filter((field) => field !== fieldName));
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log(formState);
    if (isUpdate) {
      // Handle the update operation
      updateDriver(formState);
    } else {
      // Handle the create operation
      createDriver(formState);
    }
  };

  // Function to create a new driver
  const createDriver = async (newDriverData) => {
    console.log(newDriverData);
    try {
      const response = await axios.post(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}`,
        newDriverData
      );
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update an existing driver
  const updateDriver = async (updatedDriverData) => {
    try {
      const response = await axios.put(
        `${Config.apiRequest}://${Config.apiHost}:${Config.apiPort}/${Config.apiDriver}`,
        updatedDriverData
      );
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(event) => {
        if (event.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <h3>Enter Driver details</h3>
          {/* Form fields */}
          <div className="form-group">
            <label htmlFor="driverIdNumber">Driver Id Number</label>
            <input
              name="driverIdNumber"
              value={formState.driverIdNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverName">driverName</label>
            <input
              name="driverName"
              value={formState.driverName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverEmail">driverEmail</label>
            <input
              name="driverEmail"
              value={formState.driverEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverPhoneNumber">driverPhoneNumber</label>
            <input
              name="driverPhoneNumber"
              value={formState.driverPhoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Display validation errors if any */}
          {errors && <div className="error">{`Please include: ${errors}`}</div>}

          <div className="dform-btn">
            <button className="btn" type="submit" onClick={handleSubmit}>
              {isUpdate ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dmodal;
