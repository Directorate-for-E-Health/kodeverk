import React from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export const Header = class Header extends React.Component {
  render() {
    return (
      <header>
        <Navbar />
        <a href="/">
          <img
            className="alignLeft"
            src="assets/ehelse_logo.png"
            alt="Logo e-helse"
            width="132px"
          ></img>
        </a>
      </header>
    );
  }
};

export default Header;
