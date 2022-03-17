import React from "react";
import "./App.css";
import MainPage from "./pages/MainPage";
import CodeView from "./pages/CodeView";
import ICDsearch from "./pages/ICDsearch";
import ICPCsearch from "./pages/ICPCsearch";
import NKPKsearch from "./pages/NKPKsearch";
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
