import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import ICPCAutosuggestFat from "../components/ICPCAutosuggestFat";
import Header from "../components/Header";
import Tree from "react-animated-tree";
import { kote, kute } from "../config.ts";

export const PatSearch = class PatSearch extends React.Component {
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
            <li className="inline breadCrum">
              {" "}
              Norsk patologikodeverk (NORPAT/APAT)
            </li>
          </ul>
        </article>

        <article>
          <div className="row justify-content-md-center">
            <div className="col-9">
              <ICPCAutosuggestFat
                suggestCallback={this.suggestCallback}
                placeholder="Fritekst eller kodeverk"
              />
            </div>
          </div>
        </article>

        <article className="line">
          <div className="row">
            <div class="col-md-8">
              <form>
                <strong>Filter</strong>
                <label>
                  <input
                    className="marginRight"
                    type="checkbox"
                    defaultChecked
                  />
                  NORPAT
                </label>
                <label>
                  <input
                    className="marginRight"
                    type="checkbox"
                    defaultChecked
                  />
                  APAT
                </label>
              </form>
            </div>
          </div>
        </article>
        <article>
          <div className="row gx-5">
            <div className="col-sm-8 col-sm-offset-1">
              <Tree
                content="NORPAT - norsk patologikodeverk med aktivitetskoder"
                open
                style={treeStyles}
              >
                <Tree content="E Etiologi" />
                <Tree content="F Ny funksjon/tilstand">
                  <Tree content="F.a Generelle (dys)funksjoner" />
                  <Tree content="F.b Metabolske (dys)funksjoner" />
                </Tree>
                <Tree content="M Morfologi" />
                <Tree content="P Prosedyre" />
                <Tree content="S Sykdom" />
                <Tree content="T Topografi" />
              </Tree>{" "}
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
              <p>
                <a href={kote}>Meld inn feil eller endringsforslag</a>
              </p>
              <p>
                <a href={kute}>Administer kodeverk</a>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
};

export default PatSearch;
