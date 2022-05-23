import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import Header from "../components/Header";
//import { fatProxyUrl } from "../config.ts";
//import Tree from "react-animated-tree";

export const CodeViewAdm = class CodeViewAdm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      codeSystem: "",
      content: {},
      // starCode: -1
    };
  }

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
    return (
      <div className="App">
        <Header />
        <div className="row">
          <div className="col-md-8">
            <article>
              <h2>Alvorlighetsgrad (OID=7520)</h2>
              <h3>Beskrivelse</h3>
              <p>
                Angir alvorlighetsgrad ved registrering av
                overfølsomhetsreaksjon i kjernejournal. Registrering og
                utveksling av kritisk informasjon i kjernejournal.
              </p>
              <h3>Organisasjoner</h3>
              <ul>
                <li>Ansvarlig organisasjon Norsk Helsenett</li>
                <li> Registrert av Direktoratet for e-helse</li>
              </ul>
              <h3>Inngår i</h3>
              <ul>
                <li>Kjernejournal</li>
              </ul>
              <h3>Status</h3>
              <p>Per tirsdag 1. februar 2022: Til utbredelse eller er i bruk</p>
              <h3>Kodeverdier</h3>
              <ol>
                <li>Alvorlig</li>
                <li>Mindre alvorlig</li>
                <li>Ukjent </li>
              </ol>
              <h3>Kategorier</h3>
              <p>Informasjonsinnhold</p>
            </article>
          </div>
        </div>
      </div>
    );
  }
};

export default CodeViewAdm;
