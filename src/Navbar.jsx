import React from "react";
import logo from "./assets/logo.jpg"; // update the path based on your folder
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={logo} alt="Yemeni Unity Logo" className="navbar-logo" />
        <h1 className="navbar-title">Yemeni Students @ UTHM</h1>
      </div>
    </nav>
  );
};

export default Navbar;
