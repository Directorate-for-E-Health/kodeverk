//SNOMED CT CONFIGURATIONS
//Using external Snowstorm due to CORS issues
export let terminlogyServer: string = "https://seabreeze.conteir.no";
export let branch: string = "MAIN/SNOMEDCT-NO-DAILYBUILD";
export let refsetBranch: string = "MAIN/SNOMEDCT-NO-DAILYBUILD/REFSETS";

const semanticTags =
  "semanticTags=disorder&semanticTags=finding&semanticTags=body structure";

export let urlParameters: string =
  "?limit=10&active=true&groupByConcept=true&" +
  semanticTags +
  "&language=no&language=nb&language=nn&language=en&conceptActive=true";

export const snomedURLs = {
  //browser-descriptions to get term, id
  getByTerms:
    terminlogyServer +
    "/browser/" +
    branch +
    "/descriptions" +
    urlParameters +
    "&term=",

  //members to get term, id
  getByMapTargetIcd10:
    terminlogyServer +
    "/" +
    branch +
    "/members?&referenceSet=447562003&active=true&mapTarget=",

  getByMapTargetIcpc2:
    terminlogyServer +
    "/" +
    refsetBranch +
    "/members?&referenceSet=68101000202102&active=true&mapTarget=",

  //browser-members to get a code system
  icd10Url:
    terminlogyServer +
    "/browser/" +
    branch +
    "/members" +
    urlParameters +
    "&referenceSet=447562003" +
    "&referencedComponentId=",

  icpc2Url:
    terminlogyServer +
    "/browser/" +
    refsetBranch +
    "/members" +
    urlParameters +
    "&referenceSet=68101000202102" +
    "&referencedComponentId=",

  //TODO: branch, refset ?
  anatomicalLocalisationUrl:
    terminlogyServer +
    "/browser/" +
    refsetBranch +
    "/members" +
    urlParameters +
    "&referenceSet=89811000202103" +
    "&referencedComponentId=",
};

export const GETparams = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

const version = "2022-02-04";
const languages = "no,en";

//Using external browser for best performance in prototype
export const snomedCTBrowserURL =
  "https://browser.conteir.no/?perspective=full&edition=MAIN/SNOMEDCT-NO-DAILYBUILD/" +
  version +
  "&release=&languages=" +
  languages +
  "&conceptId1=";

//Proxy url for FAT to avaid CORS issues

export const fatProxyUrl =
  "https://kodeverk.netlify.app/.netlify/functions/proxy";
