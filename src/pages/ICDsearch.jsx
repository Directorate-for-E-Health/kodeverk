import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import ICDAutosuggest from "../components/ICDAutosuggest";
import Header from "../components/Header";
import Tree from "react-animated-tree";

export const ICDsearch = class ICDsearch extends React.Component {
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

    //const typeStyles = {};
    return (
      <div className="App">
        <Header />
        <article>
          <ul className="breadCrum breadCrum">
            <li className="inline">
              <a href="/">Forside</a> &gt;
            </li>
            <li className="inline breadCrum"> ICD-10</li>
          </ul>
        </article>
        <article>
          <div className="row justify-content-md-center">
            <div className="col-9">
              <ICDAutosuggest
                suggestCallback={this.suggestCallback}
                codeSystem={"SNOMED-CT"}
                placeholder="Søk med term eller kode i ICD-10-kodeverket"
              />
            </div>
          </div>
        </article>
        <article>
          <div className="row gx-5">
            <div className="col-sm-8 col-sm-offset-1">
              <Tree content="ICD-10" open style={treeStyles}>
                <Tree content="Kapittel I (A00-B99) Visse infeksjonssykdommer og parasittsykdommer" />
                <Tree content="Kapittel II (C00-D48) Svulster">
                  <Tree content="(C00-C14) Ondartede svulster på leppe, i munnhule og i svelg" />
                  <Tree content="(C15-C26) Ondartede svulster i fordøyelsesorganer">
                    <Tree content="C15 Ondartet svulst i spiserør (neoplasma malignum oesophagi)" />
                    <Tree content="C16 Ondartet svulst i magesekk (neoplasma malignum ventriculi)">
                      <Tree content="C16.0 Cardia ventriculi" />
                      <Tree content="C16.1 Fundus ventriculi" />
                    </Tree>
                  </Tree>
                  <Tree content="(C30-C39) Ondartede svulster i åndedrettsorganer og intratorakale organer" />
                </Tree>
                <Tree content="Kapittel III (D50-D89) Sykdommer i blod og bloddannende organer og visse tilstander som angår immunsystemet" />
                <Tree
                  content="Kapittel IV (E00-E90) Endokrine sykdommer, ernæringssykdommer og metabolske forstyrrelser
"
                />
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

export default ICDsearch;
