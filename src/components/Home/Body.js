import React from "react";
import "../../css/Body.css";
import backgroundImage from "../../assets/images/bg1.png"; // Import the background image

const Body = () => {
  return (
    <section
      className="home"
      id="home"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="text">
        <h1>
          <span>Searching</span>
          <br />
          for a cab!!
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adi
          <br />
          adipisicing elit. Consectetur, rem dolorum.
        </p>
      </div>

      <div className="form-container">
        <form action="">
          <div className="input-box">
            <span>Location</span>
            <input type="search" name="" id="" placeholder="Search Place" />
          </div>
          <div className="input-box">
            <span>Pick-Up Date</span>
            <input type="date" name="" id="" />
          </div>
          <div className="input-box">
            <span>Return Date</span>
            <input type="date" name="" id="" />
          </div>
          <input type="submit" name="" id="" className="btn" value="Submit" />
        </form>
      </div>
    </section>
  );
};

export default Body;