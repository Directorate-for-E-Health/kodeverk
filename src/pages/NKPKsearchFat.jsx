import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import NKPKAutosuggestFat from "../components/NKPKAutosuggestFat";
import Header from "../components/Header";
import Tree from "react-animated-tree";

export const NKPKsearchFat = class NKPKsearchFat extends React.Component {
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
            <li className="inline breadCrum"> NKPK - FAT style</li>
          </ul>
        </article>

        <article>
          <NKPKAutosuggestFat
            suggestCallback={this.suggestCallback}
            placeholder="Fritekst eller NKPK-kode"
          />
        </article>
        <article className="line">
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
        <article>
          <div className="row">
            <div className="col-md-8">
              <h2>Kodeverket NKPK</h2>
            </div>
          </div>
        </article>
      </div>
    );
  }
};

export default NKPKsearchFat;
