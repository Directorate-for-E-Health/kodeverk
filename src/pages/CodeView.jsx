import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Header from "../components/Header";
import { fatProxyUrl } from "../config.ts";
import Tree from "react-animated-tree";

export const CodeView = class CodeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      codeSystem: "",
      content: {},
      // starCode: -1
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    let codeSystem = urlParams.get("codeSystem");
    // let swordCode = "";

    // if (window.location.href.indexOf("#") !== -1) {
    //   swordCode = urlParams.get("#");
    // }

    this.setState({ code: code, codeSystem: codeSystem });
    this.getFatData(code, codeSystem);
  }

  getFatData = (code, codeSystem) => {
    let url = fatProxyUrl + "/api/code-systems/" + codeSystem + "/" + code;
    let params = {
      method: "GET",
      headers: {
        Accept: "text/plain",
      },
    };

    fetch(url, params)
      .then((response) => response.json())
      .then((fatData) => {
        this.setState({ content: fatData });
      });
  };

  checkLinks = () => {};

  renderContent = () => {
    return this.state.content.codeValue === this.state.code ? (
      <div>
        <p>
          <strong>{"Kode: "}</strong>
          {this.state.content.codeValue}
        </p>
        <p>
          <strong> {"Term: "}</strong>
          {this.state.content.nameNorwegian}
        </p>

        {this.state.content.reportableNpr === true ? (
          <p>
            <strong> {"Rapporteres til NPR: "}</strong>
            {"true"}
          </p>
        ) : null}

        {/* <p>
            <strong> {"Beskrivelse: "}</strong>
            {this.state.content.textMax60}
          </p> */}

        {this.state.content.additionalAtcCodeRecommended === true ? (
          <p>
            <strong> {"Bruk om mulig ATC-kode for å angi legemiddel: "}</strong>
            {"true"}
          </p>
        ) : null}

        {this.state.content?.genderSpecificCode ? (
          <p>
            <strong> {"Brukes hovedsaklig på kjønn: "}</strong>
            {this.state.content.genderSpecificCode}
          </p>
        ) : null}

        {this.state.content.starCode === true ? (
          <p>
            <strong> {"Stjernekode: "}</strong>
            {"true"}
          </p>
        ) : null}

        {this.state.content.swordcodes ? (
          <div>
            <strong> {"Gyldige sverdkoder: "}</strong>
            <div
              on
              dangerouslySetInnerHTML={{
                __html: this.state.content.swordcodes,
              }}
            ></div>
            {/* <a
                href={
                  fatProxyUrl +
                  "/api/code-systems/" +
                  this.state.codeSystem + 
                  "/"+
                  this.state.swordcodes
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                (Press the link)
              </a> */}
            {/* {this.state.content.swordcodes} */}
          </div>
        ) : null}

        {this.state.content.additionalCode === true ? (
          <p>
            <strong> {"Tilleggskode: "}</strong>
            {"true"}
          </p>
        ) : null}

        {this.state.content.nonSpecificCode === "Ja" ? (
          <p>
            <strong> {"Uspesifikk kode (annen kode anbefales): "}</strong>
            {this.state.content.nonSpecificCode}
          </p>
        ) : null}

        {this.state.content.inclusion ? (
          <p>
            <strong> {"Inkluderer: "}</strong>
            <div
              dangerouslySetInnerHTML={{
                __html: this.state.content.inclusion,
              }}
            ></div>
            {/* {this.state.content.inclusion} */}
          </p>
        ) : null}

        {this.state.content.exclusion ? (
          <p>
            <strong> {"Ekskluderer: "}</strong>
            <div
              dangerouslySetInnerHTML={{
                __html: this.state.content.exclusion,
              }}
            ></div>
            {/* {this.state.content.exclusion} */}
          </p>
        ) : null}

        {this.state.content.definition ? (
          <p>
            <strong> {"Definisjon: "}</strong>
            {this.state.content.definition}
          </p>
        ) : null}

        {/* <p>
            <strong> {"Aktiv: "}</strong>
            {this.state.content.active === true ? "true" : "false"}
          </p> */}
        {/* <p>
            <strong> {"Sist oppdatert: "}</strong>
            {this.state.content.statusChangedDate}
          </p> */}
      </div>
    ) : null;
  };

  config = (open) => ({
    from: { height: 0, opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      transform: open ? "translate3d(0px,0,0)" : "translate3d(20px,0,0)",
    },
  });

  render() {
    const treeStyles = { color: "#5c5c5c" };

    return (
      <div className="App">
        <Header />

        <article>
          <h2>{this.state.code}</h2>
          <div className="row">
            <div className="col-sm-3 resizer tree">
              <Tree content="Kapittel 1" style={treeStyles}>
                <Tree content="Kapittel 1.1" />
                <Tree content="Kapittel 1.2" />
              </Tree>
              <Tree content="Kapittel 2" style={treeStyles}>
                <Tree content="Kapittel 2.1" />
                <Tree content="Kapittel 2.2" />
              </Tree>
              <Tree open content="Kapittel 3" style={treeStyles}>
                <Tree content="Kapittel 3.1" />
                <Tree open content="Kapittel 3.2">
                  <Tree content="Kode" />
                  <Tree content="Kode" />
                  <Tree
                    content={
                      <a
                        href={
                          "codeView?codeSystem=icd10&code=" + this.state.code
                        }
                        rel="noopener noreferrer"
                      >
                        {this.state.code}
                      </a>
                    }
                    style={{ color: "#000000" }}
                  />
                  <Tree content="Kode" />
                </Tree>
              </Tree>

              <Tree content="Kapittel 4" style={treeStyles} />
              <Tree content="Kapittel 5" style={treeStyles} />
            </div>
            <div className="col-sm-8">{this.renderContent()}</div>
          </div>
        </article>
      </div>
    );
  }
};

export default CodeView;
