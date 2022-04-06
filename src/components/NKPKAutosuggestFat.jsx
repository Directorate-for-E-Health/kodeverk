import React from "react";
import Autosuggest from "react-autosuggest";
//import "../styles/DisordersAutosuggest.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "reactstrap";

export default class NKPKAutosuggestFat extends React.Component {
  constructor() {
    super();
    this.state = {
      showSpinner: false,
      value: "",
      suggestions: [],
    };
  }

  getSuggestionValue = (suggestion) => {
    this.props.suggestCallback(suggestion);
    return suggestion.name_norwegian + " (" + suggestion.code + ")";
  };

  renderSuggestion = (suggestion) =>
    suggestion.code && suggestion.name_norwegian ? (
      <>
        <strong>
          {suggestion.name_norwegian.charAt(0).toUpperCase() +
            suggestion.name_norwegian.slice(1)}
        </strong>
        <br />
        {"NKPK: "}
        <a
          href={"codeView?codeSystem=nkpk&code=" + suggestion.code}
          rel="noopener noreferrer"
        >
          {suggestion.code}
        </a>
      </>
    ) : (
      ""
    );

  onSuggestionsFetchRequested = ({ value }) => {
    let query = value.trim().toLowerCase();
    this.setState({ showSpinner: true });

    let suggestions = [];
    let url =
      "https://ehelse-kodeverk.ent.eastus2.azure.elastic-cloud.com/api/as/v1/engines/codesystems/search.json";
    let body =
      '{"query": "' + query + '","filters" : {"code_system": [ "NKPK" ]}}';
    console.log("url:", url);

    if (query && query.length >= 3) {
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer search-h9rj1jveh7sna47pheugr5q6",
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response data:", data);

          let fatResults = [];
          data.results.forEach((res) => {
            // suggestion's data:
            fatResults.push({
              name_norwegian: res.name_norwegian.raw,
              code: res.code.raw,
            });
          });
          suggestions = suggestions.concat(fatResults);
          console.log("suggestions:", suggestions);

          this.setState({
            suggestions: suggestions,
            showSpinner: false,
          });
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
