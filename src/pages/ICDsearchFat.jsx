import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import ICDAutosuggestFat from "../components/ICDAutosuggestFat";
import Header from "../components/Header";
import Tree from "react-animated-tree";

export const ICDsearchFat = class ICDsearchFat extends React.Component {
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
            <li className="inline breadCrum"> ICD-10 - FAT style</li>
          </ul>
        </article>
        <article>
          <ICDAutosuggestFat
            suggestCallback={this.suggestCallback}
            placeholder="Fritekst eller ICD-10-kode"
          />
        </article>
        <article className="line">
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
                <Tree content="Kapittel IV (E00-E90) Endokrine sykdommer, ernæringssykdommer og metabolske forstyrrelser" />
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
              <h2>Kodeverket ICD-10 (og ICD-11)</h2>
              <p>
                I Norge benytter vi i dag den 10. versjonen av ICD-kodeverket –
                ICD-10. ICD-10 brukes til koding av dødsårsaker. I
                spesialisthelsetjenesten brukes ICD-10 til å rapportere
                diagnoser og kontaktårsaker til Norsk pasientregister. Kodene
                brukes også i helseregistre og i nasjonale kvalitetsindikatorer.
              </p>
              <p>
                Det er Verdens helseorganisasjon (WHO) som eier og publiserer
                ICD-kodeverket. Alle WHOs medlemsland skal benytte seg av dette
                kodeverket til statistikk for sykdommer og dødsårsaker.
                Hensikten med et internasjonalt kodeverk er å kunne sammenligne
                helsedata over landegrensene. Flere medlemsland har likevel
                behov for å tilpasse kodeverket på enkelte områder, dette
                gjelder også Norge. I Norge er det Direktoratet for e-helse som
                drifter, vedlikeholder og utvikler ICD-kodeverket.
              </p>
              <p>
                Verdens helseforsamling i WHO godkjente ICD-11 i 2019. Denne
                første internasjonale versjonen av ICD-11 er laget for at
                medlemslandene skal starte planlegging av overgangen fra ICD-10
                til ICD-11. Norge er i startfasen av strategiplanleggingen for
                dette arbeidet, og det er et omfattende arbeid og mange aktører
                som skal involveres. Endringene fra ICD-10 er svært omfattende
                og vi forventer at det vil ta mange år å innføre og iverksette
                ICD-11. Til sammenlikning tok overgangen fra ICD-9 til ICD-10 i
                Norge mellom fem og syv år.
              </p>
              <p>
                Direktoratet for e-helse er i dialog med andre nordiske land om
                innføring av ICD-11. Siden dødsårsaker rapporteres
                internasjonalt, er det forventet at dette vil være det første
                området som tar i bruk ICD-11 i Norge.
              </p>
              <p>
                <a href="https://icd.who.int/en">
                  Du kan lese mer om ICD-11 på WHO sine nettsider.
                </a>
              </p>
            </div>
          </div>
        </article>
      </div>
    );
  }
};

export default ICDsearchFat;
