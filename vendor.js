const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/send", async (req, res) => {
  const { customerId, campaignId, message } = req.body;

  // Simulate 90% success, 10% failure
  const isSuccess = Math.random() < 0.9;
  const status = isSuccess ? "SENT" : "FAILED";

  // Simulate delay and callback to /api/delivery-receipt
  setTimeout(async () => {
    try {
      await axios.post("http://localhost:5000/api/delivery-receipt", {
        customerId,
        campaignId,
        status,
      });
    } catch (err) {
      console.error("Failed to send delivery receipt", err);
    }
  }, 1000);

  res.json({ status });
});

module.exports = router;
