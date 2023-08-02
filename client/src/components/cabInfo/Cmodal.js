import React, { useState, useEffect } from "react";
import "../../css/Dmodal.css";

const Cmodal = ({ closeModal, onSubmit, defaultValue }) => {
  // State variables to manage form data and errors
  const [formState, setFormState] = useState({
    cabRegistrationNumber: "",
    cabModel: "",
    cabColour: "",
  });

  const [errors, setErrors] = useState("");
  const [editedFields, setEditedFields] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false); // Track whether it's an update or create operation

  // Validation logic for the form
  const validateForm = () => {
    if (
      formState.cabRegistrationNumber &&
      formState.cabModel &&
      formState.cabColour
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

  // useEffect hook to set formState and isUpdate based on defaultValue
  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
      setIsUpdate(true); // Set isUpdate to true if defaultValue is provided
    }
  }, [defaultValue]);

  // Handle form field changes
  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormState({
      ...formState,
      [fieldName]: fieldValue,
    });

    // Keep track of edited fields
    if (!editedFields.includes(fieldName)) {
      setEditedFields([...editedFields, fieldName]);
    } else {
      setEditedFields(editedFields.filter((field) => field !== fieldName));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onSubmit(formState); // Call the onSubmit function passed from CabCRUD.js
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
          <h3>Enter Cab details</h3>
          {/* Form fields */}
          <div className="form-group">
            <label htmlFor="cabRegistrationNumber">
              Cab Registration Number
            </label>
            <input
              name="cabRegistrationNumber"
              value={formState.cabRegistrationNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cabModel">Cab Model</label>
            <input
              name="cabModel"
              value={formState.cabModel}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="cabColour">Cab Color</label>
            <input
              name="cabColour"
              value={formState.cabColour}
              onChange={handleChange}
            />
          </div>

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

export default Cmodal;
