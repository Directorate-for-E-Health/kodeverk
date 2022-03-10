import React from "react";
import Autosuggest from "react-autosuggest";
import { snomedURLs, GETparams, snomedCTBrowserURL } from "../config.ts";
import "../styles/DisordersAutosuggest.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "reactstrap";

export default class ICDAutosuggest extends React.Component {
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
    return suggestion.term + " (" + suggestion.icd10 + ")";
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) =>
    suggestion.icd10 ? (
      <>
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
    );

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
            resultItem.icd10 = codeData.items[0]?.additionalFields?.mapTarget;
          }
        }
      });
    return codeICDPromise;
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    this.setState({ showSpinner: true });

    let promises = [];
    let suggestions = [];

    if (inputValue && inputValue.length >= 3) {
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
              // suggestion's data:
              resultItems.push({
                term: item.term,
                conceptId: item.concept.conceptId,
                // icd10: "-42-",
                // icpc2: '-',
                // locationICD: "-"
              });
            });

            resultItems.forEach((resultItem) => {
              //ICD-10
              codePromises.push(this.fillIcd10ForItem(resultItem));
              //ICPC-2
              // codePromises.push(this.fillIcpc2ForItem(resultItem));
              // codePromises.push(this.fillLocationForItem(resultItem));
            });

            return Promise.all(codePromises).then(() => {
              let filteredItems = [];

              resultItems.forEach((resItem) => {
                if (resItem.icd10 !== undefined) {
                  filteredItems.push(resItem);
                }
              });

              suggestions = suggestions.concat(filteredItems);
            }); //(!)
          }
        });

      promises.push(snomedCTPromise);

      // Or search description to render by a code in mapTarget:
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
              // locationICD: "-"
            });
          });

          // resultItems.forEach((item) => {
          //   // Get missing ICPC-2, if present
          //   codePromises.push(this.fillLocationForItem(item));
          // });

          suggestions = suggestions.concat(resultItems);

          return Promise.all(codePromises);
        });
      promises.push(mapTargetIcd10Promise);

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
