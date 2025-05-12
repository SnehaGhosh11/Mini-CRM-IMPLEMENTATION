const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Campaign = require("../models/Campaign");
const CommunicationLog = require("../models/CommunicationLog");
const axios = require("axios"); // 🔗 Required for API calls

// 🔍 Preview audience count based on rules
router.post("/preview", async (req, res) => {
  const { rules, logic } = req.body;

  try {
    const mongoQuery = rules.map((rule) => {
      const { field, operator, value } = rule;
      if (operator === "equals") return { [field]: value };
      if (operator === "contains")
        return { [field]: { $regex: value, $options: "i" } };
    });

    const finalQuery =
      logic === "AND" ? { $and: mongoQuery } : { $or: mongoQuery };
    const count = await Customer.countDocuments(finalQuery);

    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error evaluating rules");
  }
});

// 💾 Save a campaign AND trigger delivery (STEP 4)
router.post("/", async (req, res) => {
  const { name, rules, logic, audienceCount } = req.body;

  if (!name || !rules || !logic || audienceCount === undefined) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newCampaign = new Campaign({ name, rules, logic, audienceCount });
    await newCampaign.save();

    // Step 4 Delivery Trigger
    const mongoQuery = rules.map((rule) => {
      const { field, operator, value } = rule;
      if (operator === "equals") return { [field]: value };
      if (operator === "contains")
        return { [field]: { $regex: value, $options: "i" } };
    });

    const finalQuery =
      logic === "AND" ? { $and: mongoQuery } : { $or: mongoQuery };

    const customers = await Customer.find(finalQuery);

    for (const customer of customers) {
      const message = `Hi ${customer.name}, check out our new campaign: ${name}`;

      // 📝 Save to communication log
      await CommunicationLog.create({
        campaignId: newCampaign._id,
        customerId: customer._id,
        message,
      });

      // 📤 Trigger vendor delivery
      await axios.post("http://localhost:5000/api/vendor/send", {
        campaignId: newCampaign._id,
        customerId: customer._id,
        message,
      });
    }

    res.status(201).json({ message: "Campaign saved and delivery triggered!" });
  } catch (error) {
    console.error("Error saving campaign:", error);
    res.status(500).json({ message: "Error saving campaign" });
  }
});

// 📦 Get all saved campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    res.status(500).json({ message: "Error fetching campaigns" });
  }
});

// 🚚 Delivery Receipt Endpoint ✅ STEP 4 CODE
router.post("/delivery-receipt", async (req, res) => {
  const { customerId, campaignId, status } = req.body;

  try {
    await CommunicationLog.findOneAndUpdate(
      { customerId, campaignId },
      { $set: { status } }
    );
    res.json({ message: "Status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating status" });
  }
});

module.exports = router;
