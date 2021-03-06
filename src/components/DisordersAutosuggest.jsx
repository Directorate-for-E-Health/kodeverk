import React from "react";
import Autosuggest from "react-autosuggest";
import {
  snomedURLs,
  GETparams,
  snomedCTBrowserURL,
  fatProxyUrl,
} from "../config.ts";
import "../styles/DisordersAutosuggest.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "reactstrap";

export default class DisordersAutosuggest extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      showSpinner: false,
      value: "",
      suggestions: [],
    };
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => {
    this.props.suggestCallback(suggestion);
    return suggestion.term;
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => (
    <div>
      <strong>
        {suggestion.term.charAt(0).toUpperCase() + suggestion.term.slice(1)}
      </strong>
      <br />
      {"  SCTID "}
      <a
        href={snomedCTBrowserURL + suggestion.conceptId}
        target="_blank"
        rel="noopener noreferrer"
      >
        {suggestion.conceptId}
      </a>{" "}
      <i className="fa fa-external-link"></i>
      {suggestion.icd10 && suggestion.icd10 !== undefined ? (
        <>
          {" | ICD-10: "}
          <a
            href={"codeView?codeSystem=icd10&code=" + suggestion.icd10}
            rel="noopener noreferrer"
          >
            {suggestion.icd10}
          </a>
        </>
      ) : (
        ""
      )}
      {suggestion.icpc2 && suggestion.icpc2 !== undefined ? (
        <>
          {" | ICPC2: "}
          <a
            href={"codeView?codeSystem=icpc2&code=" + suggestion.icpc2}
            rel="noopener noreferrer"
          >
            {suggestion.icpc2}
          </a>
        </>
      ) : (
        ""
      )}
      {suggestion.location && suggestion.location !== undefined ? (
        <>
          {" | Anatomisk lokalisasjon: "}
          <a
            href={"codeView?codeSystem=8352&code=" + suggestion.location}
            rel="noopener noreferrer"
          >
            {suggestion.location}
          </a>
        </>
      ) : (
        ""
      )}
      {suggestion.nkpk && suggestion.nkpk !== undefined ? (
        <>
          {" | NKPK: "}
          <a
            href={"codeView?codeSystem=NKPK&code=" + suggestion.nkpk}
            rel="noopener noreferrer"
          >
            {suggestion.nkpk}
          </a>
        </>
      ) : (
        ""
      )}
    </div>
  );

  // ! First, request for norsk members;
  // ! We need to get and to check value from mapTarget (code for codeSystem);
  // ! Then we send request to fatData to get to know
  //!...if this code (mapTarget) is valid for search.
  // ! If exists, just return suggestion with the code,
  //!...if no, we send new request to international members
  fillIcd10ForItemNorsk = (resultItem) => {
    console.log("resultItem in fillIcd10ForItemNorsk", resultItem);
    let codeICDNorskPromise = fetch(
      snomedURLs.icd10NorwegianUrl + resultItem.conceptId
    ) //browser-members to get ICD-10
      .then((response) => response.json())
      .then((codeData) => {
        if (
          codeData &&
          Array.isArray(codeData.items) &&
          codeData.items.length > 0
        ) {
          if (codeData.items[0]?.additionalFields?.mapTarget !== undefined) {
            //override existing codeSystem-field:
            resultItem.icd10 =
              codeData.items[0]?.additionalFields?.mapTarget || undefined;

            // fetch for data (check if valid for norsk)
            let possibleDataPromise = fetch(
              fatProxyUrl + "/api/code-systems/icd10/" + resultItem.icd10,
              {
                method: "GET",
                headers: {
                  Accept: "text/plain",
                },
              }
            )
              .then((response) => response.json())
              .then((response) => {
                if (response.status === 404) {
                  console.log(
                    "no data, fetching international for " + resultItem.icd10
                  );
                  return this.fillIcd10ForItem(resultItem);
                } else
                  console.log(
                    "have data for " + resultItem.icd10 + ", do nothing"
                  );
              });

            return possibleDataPromise;
            // fetch for data
            // if no data do request for international
            // return promise!
          }
        }
      });
    return codeICDNorskPromise; // return any mapTarget for ICD if exists
  };

  fillIcd10ForItem = (resultItem) => {
    let codeICDPromise = fetch(snomedURLs.icd10Url + resultItem.conceptId) //browser-members to get ICD-10
      .then((response) => response.json())
      .then((codeData) => {
        if (
          codeData &&
          Array.isArray(codeData.items) &&
          codeData.items.length > 0
        ) {
          if (codeData.items[0]?.additionalFields?.mapTarget !== undefined) {
            //override existing code field:
            resultItem.icd10 =
              codeData.items[0]?.additionalFields?.mapTarget || undefined;
          }
        }
      });
    return codeICDPromise; // return any mapTarget for ICD if exists
  };

  fillIcpc2ForItem = (resultItem) => {
    let codeICPCPromise = fetch(snomedURLs.icpc2Url + resultItem.conceptId) //browser-members to get ICPC-2
      .then((response) => response.json())
      .then((codeData) => {
        if (
          codeData &&
          Array.isArray(codeData.items) &&
          codeData.items.length > 0
        ) {
          if (codeData.items[0]?.additionalFields?.mapTarget !== undefined) {
            //override existing code field:
            resultItem.icpc2 =
              codeData.items[0]?.additionalFields?.mapTarget || undefined;
          }
        }
      });
    return codeICPCPromise;
  };

  /* fillLocationForItem = (resultItem) => {
    let codeLocationPromise = fetch(
      snomedURLs.anatomicalLocalisationUrl + resultItem.conceptId
    ) //browser-members to get ICPC-2
      .then((response) => response.json())
      .then((codeData) => {
        if (
          codeData &&
          Array.isArray(codeData.items) &&
          codeData.items.length > 0
        ) {
          if (
            codeData.items[0].additionalFields.mapTarget &&
            codeData.items[0]?.additionalFields?.mapTarget !== undefined
          ) {
            //override existing code field:
            resultItem.location = codeData.items[0].additionalFields.mapTarget;
          }
        }
      });
    return codeLocationPromise;
  };*/

  fillNkpkForItem = (resultItem) => {
    let codeNkpkPromise = fetch(snomedURLs.NKPKUrl + resultItem.conceptId) //browser-members to get NKPK
      .then((response) => response.json())
      .then((codeData) => {
        if (
          codeData &&
          Array.isArray(codeData.items) &&
          codeData.items.length > 0
        ) {
          if (
            codeData.items[0].additionalFields.mapTarget &&
            codeData.items[0]?.additionalFields?.mapTarget !== undefined
          ) {
            //override existing code field:
            resultItem.nkpk = codeData.items[0].additionalFields.mapTarget;
          }
        }
      });
    return codeNkpkPromise;
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    this.setState({ showSpinner: true });

    let promises = [];
    let suggestions = [];

    if (inputValue && inputValue.length >= 3) {
      // ! For Main Page we have 2 options how to get suggestions from our search:
      // ! 1. By term (english; norwegian refset, international refset);
      // ! 2. By code (includes ICPC-2, ICD-10, location in a body);

      // ! When making search by term, we need to check,
      //!...if returned data contains appropriate mapTarget (code for codeSystem)
      //!...which we can use for the next request

      // ! 1)
      // Search descriptions to render by term:
      let snomedCTPromise = fetch(snomedURLs.getByTerms + value, GETparams) //browser-descriptions to get term, id
        .then((response) => response.json())
        .then((data) => {
          // check if input is still the same after fetch (fetch takes time):
          if (
            this.state.value.trim().toLowerCase() === inputValue &&
            data?.items?.length > 0
          ) {
            let resultItems = [];
            let codePromises = [];

            data.items.forEach((item) => {
              // suggestion's data with term and SCTID:
              resultItems.push({
                term: item.term,
                conceptId: item.concept.conceptId,
                // icd10: "-",
                // icpc2: "-",
                // location: "-",
              });
            });

            // ! Now for each suggestion we have to find and a code system and appropriate code.
            // !
            resultItems.forEach((resultItem) => {
              codePromises.push(this.fillIcd10ForItemNorsk(resultItem)); // all mapTargets
              //ICD-10
              codePromises.push(this.fillIcd10ForItem(resultItem)); // all mapTargets
              //ICPC-2
              codePromises.push(this.fillIcpc2ForItem(resultItem));
              //Location
              //   codePromises.push(this.fillLocationForItem(resultItem));
              //NKPK
              codePromises.push(this.fillNkpkForItem(resultItem));
            });
            // // ??????
            // resultItems.forEach((resIt) => {
            //   let finalMapTarget = resIt.icd10;
            //   if (
            //       fetch(snomedURLs.getByMapTargetIcd10+finalMapTarget, GETparams)
            //         .then((response) => response.json())
            //         .then((data) => {
            //           console.log("this data:", data)
            //         })
            //     )
            //     {
            //       console.log("text");
            //     }
            // })

            suggestions = suggestions.concat(resultItems);

            return Promise.all(codePromises); //(!)
          }
        });
      promises.push(snomedCTPromise);

      // Or search description to render by a code in mapTarget:
      // Collect ICD codes
      let mapTargetIcd10Promise = fetch(
        snomedURLs.getByMapTargetIcd10 + value.toUpperCase(),
        GETparams
      ) //members to get term, conceptId
        .then((response) => response.json())
        .then((data) => {
          let resultItems = [];
          let codePromises = [];

          data.items.forEach((item) => {
            // suggestion's data
            resultItems.push({
              term: item.referencedComponent.pt.term,
              conceptId: item.referencedComponent.conceptId,
              icd10: data.items[0]?.additionalFields?.mapTarget,
            });
          });

          resultItems.forEach((item) => {
            codePromises.push(this.fillIcpc2ForItem(item));
          });

          suggestions = suggestions.concat(resultItems);

          return Promise.all(codePromises);
        });
      promises.push(mapTargetIcd10Promise);

      let mapTargetIcd10NorwegianPromise = fetch(
        snomedURLs.getByMapTargetNorwegianIcd10 + value,
        GETparams
      ) //members to get term, conceptId
        .then((response) => response.json())
        .then((data) => {
          let resultItems = [];
          let codePromises = [];

          data.items.forEach((item) => {
            // suggestion's data
            resultItems.push({
              term: item.referencedComponent.pt.term,
              conceptId: item.referencedComponent.conceptId,
              icd10: data.items[0]?.additionalFields?.mapTarget,
            });
          });

          resultItems.forEach((item) => {
            codePromises.push(this.fillIcpc2ForItem(item));
          });

          suggestions = suggestions.concat(resultItems);

          return Promise.all(codePromises);
        });
      promises.push(mapTargetIcd10NorwegianPromise);

      // Collects ICPC codes
      let mapTargetIcpc2Promise = fetch(
        snomedURLs.getByMapTargetIcpc2 + value.toUpperCase(),
        GETparams
      ) //members to get term, conceptId
        .then((response) => response.json())
        .then((data) => {
          console.log("response 2 with term, conceptId: ", data);

          let resultItems = [];
          let codePromises = [];

          data.items.forEach((item) => {
            // suggestion's data
            resultItems.push({
              term: item.referencedComponent.pt.term,
              conceptId: item.referencedComponent.conceptId,
              icpc2: data.items[0]?.additionalFields?.mapTarget,
            });
          });

          resultItems.forEach((item) => {
            // Get missing ICD-10, if present
            codePromises.push(this.fillIcd10ForItem(item));
          });

          suggestions = suggestions.concat(resultItems);

          return Promise.all(codePromises);
        });
      promises.push(mapTargetIcpc2Promise);

      Promise.all(promises).then(() => {
        if (this.state.value.trim().toLowerCase() === inputValue) {
          this.setState({
            suggestions: suggestions,
            showSpinner: false,
          });
        }
      });
    } else {
      this.setState({
        suggestions: [],
      });
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onChange = (event, { newValue }) => {
    //this.props.clearCallback();
    this.setState({
      value: newValue,
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      value,
      onChange: this.onChange,
      placeholder: this.props.placeholder,
    };

    // Finally, render it!
    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        {this.state.showSpinner ? <Spinner color="success" /> : null}
      </div>
    );
  }
}
