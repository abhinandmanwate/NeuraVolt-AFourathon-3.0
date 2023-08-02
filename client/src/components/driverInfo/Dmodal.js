// Dmodal.js
import React, { useState, useEffect } from "react";
import "../../css/Dmodal.css";
import { updateDriver, createDriver } from "../../Config/DriverAPI"; // Import the API functions from api.js

const Dmodal = ({ closeModal, onSubmit, defaultValue }) => {
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
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
      setIsUpdate(true);
    }
  }, [defaultValue]);

  // State to track whether the modal is for updating an existing driver or creating a new one
  const [isUpdate, setIsUpdate] = useState(false);

  // Function to validate the form fields
  const validateForm = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState); // Call the onSubmit function passed from DriverCRUD.js
  };

  return (
    <div
      className="modal-container"
      onClick={(event) => {
        if (event.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h3>Enter Driver details</h3>
          <div className="form-group">
            <label htmlFor="driverIdNumber">Driver Id Number</label>
            <input
              name="driverIdNumber"
              value={formState.driverIdNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverName">Driver Name</label>
            <input
              name="driverName"
              value={formState.driverName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverEmail">Driver Email</label>
            <input
              name="driverEmail"
              value={formState.driverEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverPhoneNumber">Driver Phone Number</label>
            <input
              name="driverPhoneNumber"
              value={formState.driverPhoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Display validation errors if any */}
          {errors && <div className="error">{`Please include: ${errors}`}</div>}

          <div className="dform-btn">
            <button className="btn" type="submit">
              {isUpdate ? "Edit" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dmodal;
