import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <ul className="globalMenu">
      <Link to="/">
        <li>Meny</li>
      </Link>
    </ul>
  );
}

export default Navbar;
