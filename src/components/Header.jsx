import React from "react";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export const Header = class Header extends React.Component {
  render() {
    return (
      <header className="jumbotron text-left">
        <Navbar />
        <a href="/">
          <img
            className="alignLeft"
            src="assets/ehelse_logo_white.png"
            alt="Logo e-helse"
            height="150px"
          ></img>
        </a>
        <h1>Kodeverk</h1>
      </header>
    );
  }
};

export default Header;
