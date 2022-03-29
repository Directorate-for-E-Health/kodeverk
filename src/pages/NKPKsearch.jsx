import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import NKPKAutosuggest from "../components/NKPKAutosuggest";
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
          <div className="row justify-content-md-center">
            <div className="col-9">
              <NKPKAutosuggest
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
              <Tree content="NKPK" open style={treeStyles}>
                <Tree content="Kapittel A Nervesystemet" />
                <Tree content="Kapittel B Endokrine organer">
                  <Tree content="BA Tyreoidea" />
                  <Tree content="BB Paratyreoidea">
                    <Tree content="BBA Paratyreoidea" />
                    <Tree content="BBX Mindre prosedyrer på paratyreoidea"></Tree>
                  </Tree>
                </Tree>
                <Tree content="Kapittel C Øyet og øyeregionen" />
                <Tree content="F ØyeCA OrbitaKapittel D Øre, nese, bihuler og strupehode" />
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
