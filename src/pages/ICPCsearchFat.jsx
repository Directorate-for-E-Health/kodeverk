import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import ICPCAutosuggestFat from "../components/ICPCAutosuggestFat";
import Header from "../components/Header";
import Tree from "react-animated-tree";

export const ICPCsearchFat = class ICPCsearchFat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpinner: false,
      suggestion: {},
    };
  }

  suggestCallback = (suggestion) => {
    console.log("suggestion", suggestion);
    if (!suggestion) return;
    this.setState({ suggestion: suggestion });
  };

  render() {
    const treeStyles = {};

    //const typeStyles = {};
    return (
      <div className="App">
        <Header />
        <article>
          <ul className="breadCrum breadCrum">
            <li className="inline">
              <a href="/">Forside</a> &gt;
            </li>
            <li className="inline breadCrum"> ICPC-2(B) - FAT style</li>
          </ul>
        </article>

        <article>
          <ICPCAutosuggestFat
            suggestCallback={this.suggestCallback}
            placeholder="Fritekst eller ICPC-2-kode"
          />
        </article>
        <article>
          <img
            className="overflow"
            src="assets/harold.jpg"
            alt="pizdets"
            height="auto"
          ></img>
        </article>
        <article className="line">
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
        <article>
          <div className="row">
            <div className="col-md-8">
              <h2>Kodeverket ICPC-2</h2>
            </div>
          </div>
        </article>
      </div>
    );
  }
};

export default ICPCsearchFat;
