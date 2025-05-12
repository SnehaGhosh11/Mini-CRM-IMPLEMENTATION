import React, { useState } from "react";
import axios from "axios";

const AISegmentGenerator = ({ onGenerate }) => {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/ai/segment", { text: inputText });
      const data = JSON.parse(res.data.result); // assuming OpenAI returns JSON string
      setGenerated(data);
      onGenerate(data); // pass rules + logic up
    } catch (err) {
      console.error(err);
      alert("Error generating segment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow my-4">
      <h2 className="text-xl font-semibold mb-2">AI-Powered Segment Builder</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="e.g., Find users with gmail accounts who spent more than 2000"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate Rules"}
      </button>
      {generated && (
        <pre className="bg-gray-100 p-2 mt-3 rounded text-sm">
          {JSON.stringify(generated, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default AISegmentGenerator;
