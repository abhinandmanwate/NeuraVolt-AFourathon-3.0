import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/Dmodal.css";
import Config from "../../Config/Config";

const Dmodal = ({ closeModal, defaultValue }) => {
  const [formState, setFormState] = useState({
    driverIdNumber: "",
    driverName: "",
    driverEmail: "",
    driverPhoneNumber: "",
  });

  const [errors, setErrors] = useState("");
  const [editedFields, setEditedFields] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false); // Track whether it's an update or create operation

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

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
      setIsUpdate(true); // Set isUpdate to true if defaultValue is provided
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormState({
      ...formState,
      [fieldName]: fieldValue,
    });

    if (!editedFields.includes(fieldName)) {
      setEditedFields([...editedFields, fieldName]);
    } else {
      setEditedFields(editedFields.filter((field) => field !== fieldName));
    }
  };

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
