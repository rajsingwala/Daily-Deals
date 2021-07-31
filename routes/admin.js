const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const { authCheck, adminCheck } = require("../middlewares/auth");

router.get("/admin/all-orders", authCheck, adminCheck, async (req, res) => {
  const order = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();
  res.json(order);
});

router.put("/admin/order-status", authCheck, adminCheck, async (req, res) => {
  const { orderId, orderStatus } = req.body;

  const order = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();
  res.json(order); 
});

module.exports = router;
