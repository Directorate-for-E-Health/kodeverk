import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import CodeView from "./pages/CodeView";
import CodeViewAdm from "./pages/CodeViewAdm";
import ICDsearch from "./pages/ICDsearch";
import ICPCsearch from "./pages/ICPCsearch";
import NKPKsearch from "./pages/NKPKsearch";
import ICDsearchFat from "./pages/ICDsearchFat";
import ICPCsearchFat from "./pages/ICPCsearchFat";
import NKPKsearchFat from "./pages/NKPKsearchFat";
import AdmSearch from "./pages/AdmSearch";
import NLKSearch from "./pages/NLKsearch";
import PatSearch from "./pages/PatSearch";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/codeview" exact element={<CodeView />} />
          <Route path="/icdsearch" exact element={<ICDsearch />} />
          <Route path="/icpcsearch" exact element={<ICPCsearch />} />
          <Route path="/nkpksearch" exact element={<NKPKsearch />} />
          <Route path="/icdsearchfat" exact element={<ICDsearchFat />} />
          <Route path="/icpcsearchfat" exact element={<ICPCsearchFat />} />
          <Route path="/nkpksearchfat" exact element={<NKPKsearchFat />} />
          <Route path="/nlksearch" exact element={<NLKSearch />} />
          <Route path="/admsearch" exact element={<AdmSearch />} />
          <Route path="/patsearch" exact element={<PatSearch />} />
          <Route path="/codeviewadm" exact element={<CodeViewAdm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
