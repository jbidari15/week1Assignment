import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navContainer">
      <div className="Nav">
        <div className="view">
          <Link to="/">View</Link>
        </div>
        <div>
          <Link to="/integrify/students/new">Add</Link>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
