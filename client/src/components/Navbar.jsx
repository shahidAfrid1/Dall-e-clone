import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
const Navbar = () => {
  return (
    <header>
      <nav>
        <Link to={"/"} className="logo-link">
          <h1>Dall.E.</h1>
        </Link>
        <Link className="button-link" to={"/create"}>
          Create
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
