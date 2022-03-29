import React from "react";
import Autosuggest from "react-autosuggest";
//import "../styles/DisordersAutosuggest.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Spinner } from "reactstrap";

export default class ICDAutosuggestFat extends React.Component {
  constructor() {
    super();
    /* 
The "query"-value should be fetched from the autosuggest search field.
It's the fileds "name_norwegian" and "code" we are looking for.

curl --location --request POST 'https://ehelse-kodeverk.ent.eastus2.azure.elastic-cloud.com/api/as/v1/engines/codesystems/search.json' \
--header 'Authorization: Bearer search-h9rj1jveh7sna47pheugr5q6' \
--header 'Content-Type: application/json' \
--data-raw '{
  "query": "angst",
  "filters" : {
    "code_system": [ "ICD-10" ]
  }
}
*/

    this.state = {
      showSpinner: false,
      value: "",
      suggestions: [],
    };

    return (
      <div>
        <Autosuggest />
        {this.state.showSpinner ? <Spinner color="success" /> : null}
      </div>
    );
  }
}
