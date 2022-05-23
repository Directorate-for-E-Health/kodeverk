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
          <div
            class="row"
            style={{
              backgroundColor: "red",
              marginLeft: "-40px",
              marginRight: "-40px",
            }}
          >
            {/*<div class="col-md-12">
              <div className="breakingNews">
                <p>
                  {" "}
                  <strong>Akkurat nå:</strong> &nbsp; Søk direkte i{" "}
                  <a href="/icdsearchfat">ICD-10</a>,{" "}
                  <a href="/icpcsearchfat">ICPC-2</a> og
                  <a href="/nkpksearchfat"> NKPK</a> !!!!
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Kodeverkene er gjort
                  tilgjengelig i FAT &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dataene
                  lastes inn i Elastic fra HealthTerm.{"             "}
                </p>
              </div>
         
            </div> */}
          </div>
        </article>
        <article>
          <ul className="breadCrum breadCrum">
            <li className="breadCrum">Forside</li>
          </ul>
        </article>

        <article>
          <div className="row justify-content-md-center">
            <div className="col-9">
              <DisordersAutosuggest
                // <AutosuggestICDandICPC
                suggestCallback={this.suggestCallback}
                codeSystem={"SNOMED-CT"}
                placeholder="Søk med term eller kode (SNOMED CT, ICD-10, ICPC-2)"
              />
            </div>
          </div>
        </article>

        <article>
          <div className="row">
            <div className="col-md-4">
              <h2>Kliniske kodeverk</h2>
              <ul className="navigation">
                <li>
                  <a href="/icdsearch">ICD-10 terminologi &gt;&gt;</a>
                </li>
                <li>
                  <a href="/icdsearchfat">ICD-10 kodeverk&gt;&gt;</a>
                </li>
                <li>
                  <a href="/icpcsearch">ICPC-2 terminologi&gt;&gt;</a>
                </li>
                <li>
                  <a href="/icpcsearchfat">ICPC-2 kodeverk&gt;&gt;</a>
                </li>
                <li>
                  <a href="/nkpksearch">NKPK &gt;&gt;</a>
                </li>
                <li>
                  <a href="/nkpksearchfat">NKPK FAT&gt;&gt;</a>
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
                <a href="/admsearch">Kodeverk i standarder &gt;&gt;</a>
              </h2>
            </div>
          </div>
        </article>
        <article className="cp-imageAndText__centerWrapper--borderBottom">
          <h2 className="pt-subject__componentsWrapper">LAB</h2>
          <p className="cp-text--22">
            Her finner du alle de nasjonale labkodeverkene.
          </p>

          <a href="/nlksearch" className="cp-imageAndText__linkWrapper">
            <span className="cp-imageAndText__link cp-text--22">
              Norsk laboratoriekodeverk (NLK)
            </span>
            <svg
              class="cp-imageAndText__arrow"
              width="61"
              height="16"
              viewBox="0 0 61 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3432 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3432 15.0711L60.7071 8.70711ZM0 9H60V7H0V9Z"
                fill="#0069E8"
              ></path>
            </svg>
          </a>

          <a href="/patsearch" className="cp-imageAndText__linkWrapper">
            <span className="cp-imageAndText__link cp-text--22">
              Norsk patologikodeverk (NORPAT/APAT)
            </span>
            <svg
              class="cp-imageAndText__arrow"
              width="61"
              height="16"
              viewBox="0 0 61 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3432 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3432 15.0711L60.7071 8.70711ZM0 9H60V7H0V9Z"
                fill="#0069E8"
              ></path>
            </svg>
          </a>
        </article>
        <article className="cp-imageAndText__centerWrapper--borderBottom">
          <h2 className="pt-subject__componentsWrapper">
            Om Kodeverk og terminologi
          </h2>
          <p className="cp-text--22">
            Kodeverk er et verktøy for søk og oppslag som brukes i den norske
            helsetjenesten.
          </p>

          <a href="/" className="cp-imageAndText__linkWrapper">
            <span className="cp-imageAndText__link cp-text--22">
              Les mer om Kodeverk og Dirketoratet for e-helse
            </span>
            <svg
              class="cp-imageAndText__arrow"
              width="61"
              height="16"
              viewBox="0 0 61 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60.7071 8.70711C61.0976 8.31658 61.0976 7.68342 60.7071 7.29289L54.3432 0.928932C53.9526 0.538408 53.3195 0.538408 52.9289 0.928932C52.5384 1.31946 52.5384 1.95262 52.9289 2.34315L58.5858 8L52.9289 13.6569C52.5384 14.0474 52.5384 14.6805 52.9289 15.0711C53.3195 15.4616 53.9526 15.4616 54.3432 15.0711L60.7071 8.70711ZM0 9H60V7H0V9Z"
                fill="#0069E8"
              ></path>
            </svg>
          </a>
        </article>
      </div>
    );
  }
};

export default MainPage;
