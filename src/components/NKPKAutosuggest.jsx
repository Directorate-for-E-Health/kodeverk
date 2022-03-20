import React from "react";
import Autosuggest from "react-autosuggest";
import { snomedURLs, GETparams, snomedCTBrowserURL } from "../config.ts";
import "../styles/DisordersAutosuggest.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "reactstrap";

export default class NKPKAutosuggest extends React.Component {
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

  fillNkpkForItem = (resultItem) => {
    let codeNKPKPromise = fetch(snomedURLs.NKPKUrl + resultItem.conceptId) //browser-members to get NKPK
      .then((response) => response.json())
      .then((codeData) => {
        if (
          codeData &&
          Array.isArray(codeData.items) &&
          codeData.items.length > 0
        ) {
          if (codeData.items[0]?.additionalFields?.mapTarget !== undefined) {
            //override existing code field:
            resultItem.nkpk =
              codeData.items[0]?.additionalFields?.mapTarget || "0";
          }
        }
      });
    return codeNKPKPromise;
  };

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
      <i className="fa fa-external-link"></i> {" | NKPK: "}
      <a
        href={"codeView?codeSystem=nkpk&code=" + suggestion.nkpk}
        rel="noopener noreferrer"
      >
        {suggestion.nkpk}
      </a>
    </div>
  );

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    this.setState({ showSpinner: true });

    let promises = [];
    let suggestions = [];

    //snomedURLs.getTerms = URLaddress; value = a term from users input
    if (inputValue && inputValue.length >= 3) {
      // First request to Snomed: search by term
      let snomedCTPromise = fetch(snomedURLs.getByTerms + value, GETparams)
        .then((response) => response.json())
        .then((data) => {
          // check if input is still the same after fetch (fetch takes time)
          if (
            this.state.value.trim().toLowerCase() === inputValue &&
            data?.items?.length > 0
          ) {
            let resultItems = []; // for suggestions
            let codePromises = []; // promises with code system

            data.items.forEach((item) => {
              resultItems.push({
                term: item.term,
                conceptId: item.concept.conceptId,
                nkpk: "-",
              });
            });

            resultItems.forEach((resultItem) => {
              //NKPK
              codePromises.push(this.fillNkpkForItem(resultItem));
            });

            return Promise.all(codePromises).then(() => {
              let finalResult = [];
              resultItems.forEach((resItem) => {
                if (resItem.nkpk !== "-") finalResult.push(resItem);
              });

              suggestions = suggestions.concat(finalResult);
            }); //(!)
          }
        });
      promises.push(snomedCTPromise);

      // Or search description to render by a code in mapTarget:
      let mapTargetNkpkPromise = fetch(
        snomedURLs.getByMapTargetNkpk + value.toUpperCase(),
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
              nkpk: data.items[0]?.additionalFields?.mapTarget,
            });
          });

          suggestions = suggestions.concat(resultItems);

          return Promise.all(codePromises);
        });
      promises.push(mapTargetNkpkPromise);

      Promise.all(promises).then(() => {
        if (this.state.value.trim().toLowerCase() === inputValue) {
          // set filled items as suggestions
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
