import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignList from "./pages/CampaignList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/campaigns" element={<CampaignList />} />
      </Routes>
    </Router>
  );
};

export default App;
