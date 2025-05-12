import React, { useEffect, useState } from "react";
import axios from "axios";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/campaigns").then((res) => {
      setCampaigns(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Campaigns</h2>
        {campaigns.map((camp) => (
          <div
            key={camp._id}
            className="p-6 mb-4 bg-white border rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-semibold text-indigo-700">
              {camp.name}
            </h3>
            <p className="text-gray-600">
              Audience Count: {camp.audienceCount}
            </p>
            <p className="text-gray-500">
              Created: {new Date(camp.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
