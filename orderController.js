const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order created", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createOrder };
