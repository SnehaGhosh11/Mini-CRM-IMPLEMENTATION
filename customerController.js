const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json({ message: "Customer created", customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCustomer };
