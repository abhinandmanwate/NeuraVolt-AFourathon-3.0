import React from "react";
import "../../css/Navbar.css";
import logo1 from "../../assets/images/transport.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar-header">
      <a href="#" className="logo"></a>
      <Link to="/" className="logo">
        <img src={logo1} alt="" />
      </Link>

      {/* Navigation menu */}
      <ul className="navbar">
        <li>
          <a className="anchor" href="#home">
            Home
          </a>
        </li>
        <li>
          <a className="anchor" href="#ride">
            Ride
          </a>
        </li>
        <li>
          <a className="anchor" href="#services">
            Services
          </a>
        </li>
        <li>
          <a className="anchor" href="#about">
            About
          </a>
        </li>
        <li>
          <a className="anchor" href="#reviews">
            Reviews
          </a>
        </li>
      </ul>

      {/* Header buttons */}
      <div className="header-btn">
        <Link to="/driver" className="sign-up">
          Driver Page
        </Link>
        <Link to="/cab" className="sign-up">
          Cab Page
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
