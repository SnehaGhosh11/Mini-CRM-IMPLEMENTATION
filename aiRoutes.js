const express = require("express");
const router = express.Router();
const openai = require("../utils/openai"); // ✅ Correct backend path

// 🌟 Natural Language to Segment Rules
router.post("/segment", async (req, res) => {
  const { text } = req.body;

  try {
    const prompt = `Convert this instruction to customer segmentation rules: "${text}". Format as JSON with "rules" and "logic".`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Changed to a fallback model (GPT-3.5)
      messages: [{ role: "user", content: prompt }],
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ result: aiResponse });
  } catch (error) {
    console.error("AI segment error:", error.message);
    // Logging full error details
    console.error("Full Error Details:", error);
    res
      .status(500)
      .json({
        message: "AI failed to generate segment rules.",
        error: error.message,
      });
  }
});

// 💬 Suggest Message Copy
router.post("/message-suggest", async (req, res) => {
  const { campaignName, customerType } = req.body;

  try {
    const prompt = `Generate a short marketing message for a campaign named "${campaignName}" targeting "${customerType}".`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Changed to fallback model (GPT-3.5)
      messages: [{ role: "user", content: prompt }],
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ message: aiResponse });
  } catch (error) {
    console.error("AI message error:", error.message);
    res
      .status(500)
      .json({
        message: "AI failed to suggest a message.",
        error: error.message,
      });
  }
});

module.exports = router;
