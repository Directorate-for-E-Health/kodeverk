import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import DisordersAutosuggest from "../components/DisordersAutosuggest";
// import AutosuggestICDandICPC from "../components/AutosuggestICDandICPC";
import Header from "../components/Header";

export const MainPage = class MainPage extends React.Component {
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
    return (
      <div>
        <Header />
        <article>
          <ul className="breadCrum breadCrum">
            <li className="breadCrum">Forside</li>
          </ul>
        </article>

        <article>
          <div className="col-6">
            <DisordersAutosuggest
              // <AutosuggestICDandICPC
              suggestCallback={this.suggestCallback}
              codeSystem={"SNOMED-CT"}
              placeholder="Søk med term eller kode (SNOMED CT, ICD-10, ICPC-2)"
            />
          </div>
        </article>

        <article className="line">
          <div className="row">
            <div className="col-md-4">
              <h2>Kliniske kodeverk</h2>
              <ul className="navigation">
                <li>
                  <a href="/icdsearch">ICD-10 &gt;&gt;</a>
                </li>
                <li>
                  <a href="/icpcsearch">ICPC-2 &gt;&gt;</a>
                </li>
                <li>
                  <a href="/">NKPK</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h2>Labkodeverk</h2>
              <ul className="navigation">
                <li>
                  <a href="/">NORPAT</a>
                </li>
                <li>
                  <a href="/">Prøvemateriale</a>
                </li>
                <li>
                  <a href="/">Anatomisk lokalisasjon</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 bg-light">
              <h2>
                <a href="/">Kodeverk i standarder &gt;&gt;</a>
              </h2>
            </div>
          </div>
        </article>
        <article>
          <div className="row">
            <div className="col-md-8">
              <p>
                Kodeverk er et verktøy for søk og oppslag som brukes i den
                norske helsetjenesten.
              </p>
              <p>
                <a href="/">Les mer om Kodeverk og Dirketoratet for e-helse</a>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
};

export default MainPage;