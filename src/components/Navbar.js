import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <ul className="globalMenu">
      <Link to="/">
        <li>Forside</li>
      </Link>
      <Link to="/icdsearch">
        <li>ICD-10</li>
      </Link>
      <Link to="/icpcsearch">
        <li>ICPC-2</li>
      </Link>
      <Link to="/NKPKsearch">
        <li>NKPK</li>
      </Link>
    </ul>
  );
}

export default Navbar;
