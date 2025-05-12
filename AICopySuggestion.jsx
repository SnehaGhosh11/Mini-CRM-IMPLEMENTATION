import React, { useState } from "react";
import axios from "axios";

const AICopySuggestion = ({ campaignName, customerType, onSetMessage }) => {
  const [loading, setLoading] = useState(false);
  const [suggested, setSuggested] = useState("");

  const handleSuggest = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/ai/message-suggest", {
        campaignName,
        customerType,
      });
      setSuggested(res.data.message);
      onSetMessage(res.data.message); // update message field
    } catch (err) {
      console.error(err);
      alert("Error suggesting message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow my-4">
      <h2 className="text-xl font-semibold mb-2">
        AI Campaign Message Suggestion
      </h2>
      <button
        onClick={handleSuggest}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Suggest Message"}
      </button>
      {suggested && (
        <div className="bg-gray-100 p-2 mt-3 rounded text-sm">
          <p>{suggested}</p>
        </div>
      )}
    </div>
  );
};

export default AICopySuggestion;
