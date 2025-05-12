import React, { useState } from "react";
import axios from "axios";
import AISegmentGenerator from "../components/AI/AISegmentGenerator";
import AICopySuggestion from "../components/AI/AICopySuggestion";

const CreateCampaign = () => {
  const [rules, setRules] = useState([
    { field: "name", operator: "equals", value: "" },
  ]);
  const [logic, setLogic] = useState("AND");
  const [audienceCount, setAudienceCount] = useState(null);
  const [message, setMessage] = useState("");
  const [aiRules, setAiRules] = useState(null);
  const [aiLogic, setAiLogic] = useState(null);

  const handleRuleChange = (index, key, val) => {
    const newRules = [...rules];
    newRules[index][key] = val;
    setRules(newRules);
  };

  const addRule = () =>
    setRules([...rules, { field: "name", operator: "equals", value: "" }]);
  const removeRule = (index) => setRules(rules.filter((_, i) => i !== index));

  const previewAudience = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/campaigns/preview",
        { rules, logic }
      );
      setAudienceCount(res.data.count);
    } catch (error) {
      console.error("Error previewing audience:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-indigo-700">
        Create Campaign
      </h2>

      <AISegmentGenerator
        onGenerate={(data) => {
          setAiRules(data.rules);
          setAiLogic(data.logic);
        }}
      />

      <div className="bg-gray-50 p-4 rounded mb-4">
        <h3 className="text-xl font-semibold mb-2">Manual Rules</h3>
        {rules.map((rule, i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <select
              className="border rounded p-1"
              value={rule.field}
              onChange={(e) => handleRuleChange(i, "field", e.target.value)}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            <select
              className="border rounded p-1"
              value={rule.operator}
              onChange={(e) => handleRuleChange(i, "operator", e.target.value)}
            >
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
            </select>
            <input
              className="border rounded p-1"
              value={rule.value}
              onChange={(e) => handleRuleChange(i, "value", e.target.value)}
            />
            <button
              onClick={() => removeRule(i)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              X
            </button>
          </div>
        ))}
        <button
          onClick={addRule}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          + Add Rule
        </button>
      </div>

      <label className="block mb-4">
        <span className="font-medium">Logic:</span>
        <select
          className="ml-2 border rounded p-1"
          value={logic}
          onChange={(e) => setLogic(e.target.value)}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </label>

      <button
        onClick={previewAudience}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Preview Audience
      </button>
      {audienceCount !== null && (
        <p className="mt-2 text-green-700 font-medium">
          Matching Customers: {audienceCount}
        </p>
      )}

      {aiRules && aiLogic && (
        <div className="bg-yellow-50 p-4 rounded mt-4">
          <h3 className="font-semibold">AI-Generated Segment</h3>
          <p>
            <strong>Rules:</strong> {JSON.stringify(aiRules, null, 2)}
          </p>
          <p>
            <strong>Logic:</strong> {aiLogic}
          </p>
        </div>
      )}

      <AICopySuggestion
        campaignName="Summer Sale"
        customerType="frequent buyers"
        onSetMessage={setMessage}
      />

      {message && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">
            Suggested Campaign Message:
          </h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default CreateCampaign;
