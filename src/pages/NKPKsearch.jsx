import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import ICPCAutosuggest from "../components/ICPCAutosuggest";
import Header from "../components/Header";
import Tree from "react-animated-tree";

export const NKPKsearch = class NKPKsearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false,
      codeSystem: "",
      suggestion: {},
    };
  }

  suggestCallback = (suggestion) => {
    if (!suggestion) return;
    this.setState({ suggestion: suggestion });
  };

  render() {
    const treeStyles = {};
    return (
      <div className="App">
        <Header />
        <article>
          <ul className="breadCrum breadCrum">
            <li className="inline">
              <a href="/">Forside</a> &gt;
            </li>
            <li className="inline breadCrum"> NKPK</li>
          </ul>
        </article>
        <article>
          <h1>Under arbeid</h1>
          <div className="row justify-content-md-center">
            <div className="col-9">
              <ICPCAutosuggest
                suggestCallback={this.suggestCallback}
                codeSystem={"SNOMED-CT"}
                placeholder="Søk med term eller kode i NKPK-kodeverket"
              />
            </div>
          </div>
        </article>
        <article>
          <div className="row gx-5">
            <div className="col-sm-8 col-sm-offset-1">
              <Tree content="ICPC-2" open style={treeStyles}>
                <Tree content="A Allment og uspesifisert" />
                <Tree content="B Blod, bloddannende organer og immunsystemet">
                  <Tree content="Symptomer og plager" />
                  <Tree content="Diagnoser/sykdommer">
                    <Tree content="B70 Lymfadenitt akutt" />
                    <Tree content="B71 Lymfadenitt kronisk/uspesifik"></Tree>
                  </Tree>
                </Tree>
                <Tree content="D Fordøyelsessystemet" />
                <Tree content="F Øye" />
              </Tree>
            </div>
            <div className="col-sm-4 bg-light">
              <p className="harmonizer">
                <a href="/">Abonner på endringer</a>
              </p>
              <p>
                <a href="/">Last ned som Excel/CSV</a>
              </p>
              <p>
                <a href="/">Last ned som XML</a>
              </p>
              <p>
                <a href="https://fat-dev.azurewebsites.net/index.html">
                  Hent fra API
                </a>
                &nbsp;
                <i className="fa fa-external-link"> </i>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
};

export default NKPKsearch;
