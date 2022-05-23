import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import ICPCAutosuggestFat from "../components/ICPCAutosuggestFat";
import Header from "../components/Header";
import Tree from "react-animated-tree";
import { kote, kute } from "../config.ts";

export const AdmSearch = class AdmSearch extends React.Component {
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
            <li className="inline breadCrum"> Kodeverk i standarder</li>
          </ul>
        </article>

        <article>
          <ICPCAutosuggestFat
            suggestCallback={this.suggestCallback}
            placeholder="Fritekst eller kodeverk"
          />
        </article>

        <article className="line">
          <div className="row">
            <div class="col-md-8">
              <h2>Samlinger av kodeverk</h2>
              <p>
                Kodeverk hører ofte naturlig sammen i en samling. For eksempel
                kan en meldingsstandard benytte en hel del kodeverk. Samtidig
                kan kodeverkene enkeltvis være gjenbrukt i mange ulike
                sammenhenger.
              </p>
              <div className="col-sm-8 col-sm-offset-1">
                <Tree
                  content="Applikasjonskvittering"
                  style={treeStyles}
                ></Tree>
                <Tree content="Digital dialog" style={treeStyles}></Tree>

                <Tree
                  content="Epikrise (elektronisk melding)"
                  style={treeStyles}
                ></Tree>
                <Tree content="EPJ-løftet" style={treeStyles}></Tree>
                <Tree content="EPJ-standard" style={treeStyles}></Tree>
                <Tree content="Fastlegeordningen" style={treeStyles}></Tree>
                <Tree content="Graviditet og fødsel" style={treeStyles}></Tree>
                <Tree
                  content="Helsestasjons- og skolehelsetjenesten"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="Henvisning (elektronisk melding)"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="In vitro fertilisering"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="Innrapportering av trekk til NAV (elektronisk melding)"
                  style={treeStyles}
                ></Tree>
                <Tree content="ISO standarder" style={treeStyles}></Tree>
                <Tree content="Kjernejournal" style={treeStyles}>
                  <Tree
                    content="Kilde til opplysninger (OID=7498)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Kritisk medisinsk tilstand (OID=7512)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Kritisk medisinsk tilstand - begrunnelse (OID=7513)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Annen allergi som kritisk informasjon (OID=7514)"
                    style={treeStyles}
                  ></Tree>

                  <Tree
                    content="Intubasjonsproblem som kritisk informasjon (OID=7515)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Mulighet for maskeventilasjon (OID=7516)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Pågående behandling som kritisk informasjon (OID=7517)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Implantater som kritisk informasjon (OID=7518)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Smittetype som kritisk informasjon (OID=7519)"
                    style={treeStyles}
                  ></Tree>
                  <a href="codeviewadm">
                    <Tree
                      content="Alvorlighetsgrad (OID=7520)"
                      style={treeStyles}
                    ></Tree>
                  </a>
                  <Tree
                    content="Sannsynlighet (OID=7521)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Prosedyreendringer som kritisk informasjon (OID=7522)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Kilde til informasjon (OID=7523)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Bekreftelse på kritisk informasjon (OID=7524)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Kommunikasjonsvansker (OID=7525)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Innbyggers innmelding av behov for endring av opplysninger i Kjernejournal (OID=7604)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Typer av kritisk informasjon (OID=7650)"
                    style={treeStyles}
                  ></Tree>
                  <Tree
                    content="Underkategorier av kritisk informasjon (OID=7651)"
                    style={treeStyles}
                  ></Tree>
                </Tree>
                <Tree content="KPR Helse og omsorg" style={treeStyles}></Tree>
                <Tree
                  content="Kreftregistermeldinger"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="Laboratorieundersøkelser"
                  style={treeStyles}
                ></Tree>
                <Tree content="Legemiddel" style={treeStyles}></Tree>
                <Tree content="Legeoppgjørsmelding" style={treeStyles}></Tree>
                <Tree
                  content="Melding om arbeidsrelatert sykdom eller skade"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="Norsk Enhetlig Kodeverk for LABoratorietjenester (NEKLAB)"
                  style={treeStyles}
                ></Tree>
                <Tree content="NPR-samlingen" style={treeStyles}></Tree>
                <Tree
                  content="Organisasjonskodeverk (OK 2007)"
                  style={treeStyles}
                ></Tree>
                <Tree content="Pasientmeldinger" style={treeStyles}></Tree>
                <Tree
                  content="Personskade statistikk"
                  style={treeStyles}
                ></Tree>
                <Tree content="Pleie- og omsorg" style={treeStyles}></Tree>
                <Tree
                  content="Prehospitale tjenester"
                  style={treeStyles}
                ></Tree>

                <Tree content="Psykisk helse" style={treeStyles}></Tree>
                <Tree
                  content="Rekvisisjon og svar (elektronisk melding)"
                  style={treeStyles}
                ></Tree>
                <Tree content="Resept" style={treeStyles}></Tree>
                <Tree content="Rusbehandlingen KKS" style={treeStyles}></Tree>
                <Tree
                  content="Spesifikasjon for Begreper Kodeverk Klassifikasjoner (BeKK)"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="Svarmelding (på rekvisisjon)"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="Sykmeldingsattest/Legeerklæring (elektronisk melding)"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="Tilhører ikke kodeverkssamling"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="Tjenestebasert adressering"
                  style={treeStyles}
                ></Tree>
                <Tree
                  content="Uønskede pasienthendelser"
                  style={treeStyles}
                ></Tree>
                <Tree content="Vaksine (SYSVAK)" style={treeStyles}></Tree>
              </div>
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
        <article>
          <div className="row">
            <div className="col-md-8">
              <h2>Kodeverket i standarder</h2>
              <p>
                Det finnes mange små administrative kodeverk og mange innbyrdes
                varianter. Det er ønskelig at det blir en standardisert bruk av
                disse. Når en standardisering er utført vil kodeverkene få en
                status som sier om de er anbefalt eller ikke.
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
};

export default AdmSearch;
