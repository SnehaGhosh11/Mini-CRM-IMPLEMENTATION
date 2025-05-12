import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        {/* Example route: Home page */}
        <Route path="/" element={<h1>Welcome to Mini CRM</h1>} />

        {/* Add more routes below as you create pages */}
        {/* <Route path="/campaigns" element={<CampaignsPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
