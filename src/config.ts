//SNOMED CT CONFIGURATIONS
//Using external Snowstorm due to CORS issues
//export let terminlogyServer: string =
// "https://snowstorm-db-prod.northeurope.cloudapp.azure.com";
export let terminlogyServer: string =
  "https://dailybuild.terminologi.ehelse.no/snowstorm/snomed-ct";
export let branch: string = "MAIN/SNOMEDCT-NO";
export let refsetBranch: string = "MAIN/SNOMEDCT-NO/REFSETS";

const semanticTags =
  "semanticTags=disorder&semanticTags=finding&semanticTags=body structure&semanticTags=procedure";

const semanticTagsFindings =
  "semanticTags=disorder&semanticTags=finding&semanticTags=situation&semanticTags=event";

const semanticTagsProcedures = "semanticTags=disorder&semanticTags=procedure";

export let urlParameters: string =
  "?limit=5&active=true&groupByConcept=true&" +
  semanticTags +
  "&language=no&language=nb&language=nn&language=en&conceptActive=true";

export let urlParametersFindings: string =
  "?limit=5&active=true&groupByConcept=true&" +
  semanticTagsFindings +
  "&language=no&language=nb&language=nn&language=en&conceptActive=true";

export let urlParametersProcedures: string =
  "?limit=5&active=true&groupByConcept=true&" +
  semanticTagsProcedures +
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
  getByMapTargetNorwegianIcd10:
    terminlogyServer +
    "/" +
    refsetBranch +
    "/members?&referenceSet=447562003&module=51000202101&active=true&mapTarget=",

  getByMapTargetIcpc2:
    terminlogyServer +
    "/" +
    refsetBranch +
    "/members?&referenceSet=68101000202102&active=true&mapTarget=",

  getByMapTargetNkpk:
    terminlogyServer +
    "/" +
    refsetBranch +
    "/members?&referenceSet=37761000202105&active=true&mapTarget=",

  //browser-members to get a code system
  icd10Url:
    terminlogyServer +
    "/browser/" +
    refsetBranch +
    "/members" +
    urlParametersFindings +
    "&referenceSet=447562003" +
    "&referencedComponentId=",

  icd10NorwegianUrl:
    terminlogyServer +
    "/browser/" +
    refsetBranch +
    "/members" +
    urlParametersFindings +
    "&referenceSet=447562003" +
    "&module=51000202101" +
    "&referencedComponentId=",

  icpc2Url:
    terminlogyServer +
    "/browser/" +
    refsetBranch +
    "/members" +
    urlParametersFindings +
    "&referenceSet=68101000202102" +
    "&referencedComponentId=",

  anatomicalLocalisationUrl:
    terminlogyServer +
    "/browser/" +
    refsetBranch +
    "/members" +
    urlParameters +
    "&referenceSet=89811000202103" +
    "&referencedComponentId=",

  NKPKUrl:
    terminlogyServer +
    "/browser/" +
    refsetBranch +
    "/members" +
    urlParametersProcedures +
    "&referenceSet=37821000202109" +
    "&referencedComponentId=",
};

export const GETparams = {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

//const version = "2022-02-04";
const languages = "no,en";

//Using external browser for best performance in prototype
export const snomedCTBrowserURL =
  "https://dailybuild.terminologi.ehelse.no/?perspective=full&edition=MAIN/SNOMEDCT-NO/REFSETS" +
  //  version +
  "&release=&languages=" +
  languages +
  "&conceptId1=";

//Proxy url for FAT to avaid CORS issues

export const fatProxyUrl = "https://fat.terminologi.ehelse.no";
export const kote = "https://salmon-sea-06bfc2e03.1.azurestaticapps.net/";
export const kute = "https://happy-mud-03a067d03.1.azurestaticapps.net/";
