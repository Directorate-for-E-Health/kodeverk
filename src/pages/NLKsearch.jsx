import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import NKPKAutosuggest from "../components/NKPKAutosuggest";
import Header from "../components/Header";

export const NLKsearch = class NLKsearch extends React.Component {
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
      <div className="App">
        <Header />
        <article>
          <ul className="breadCrum breadCrum">
            <li className="inline">
              <a href="/">Forside</a> &gt;
            </li>
            <li className="inline breadCrum">
              {" "}
              Norsk laboratoriekodeverk (NLK)
            </li>
          </ul>
        </article>
        <article>
          <div className="row justify-content-md-center">
            <div className="col-9">
              <NKPKAutosuggest
                suggestCallback={this.suggestCallback}
                codeSystem={"SNOMED-CT"}
                placeholder="Søk med kodeverdi, kodedefinisjon og norsk bruksnavn"
              />
            </div>
          </div>
        </article>
        <article>
          <div className="row gx-5">
            <div className="col-sm-8 col-sm-offset-1">
              <form>
                <strong>Filter</strong>
                <label>
                  <input
                    className="marginRight"
                    type="checkbox"
                    defaultChecked
                  />
                  NLK
                </label>
                <label>
                  <input
                    className="marginRight"
                    type="checkbox"
                    defaultChecked
                  />
                  Anatonomisk lokalisasjon
                </label>
                <label>
                  <input
                    className="marginRight"
                    type="checkbox"
                    defaultChecked
                  />
                  Prøvemateriale
                </label>
                <label>
                  <input
                    className="marginRight"
                    type="checkbox"
                    defaultChecked
                  />
                  Tekstlige svarverdier
                </label>
              </form>
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

export default NLKsearch;
