import React from "react";
import Body from "../Home/Body";
import "../../css/landing.css";
import Navbar from "../Home/Navbar"

function Landing() {
  return (
    <div>
      <Navbar /> {/* Add your Navbar component */}
      <Body /> {/* Render the Body component */}
    </div>
  );
}

export default Landing;
