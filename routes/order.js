const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");
const Product = require("../models/product");
const { authCheck } = require("../middlewares/auth");
const uniqid = require("uniqid");

router.post("/user/order", authCheck, async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email });
  const { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  const newOrder = await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  const product = await Product.bulkWrite(bulkOption, {});

  res.json({ ok: true });
});

router.get("/user/getorder", authCheck, async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const order = await Order.find({ orderedBy: user._id })
    .populate("products.product")
    .sort("-createdAt")
    .exec();

  res.json(order);
});

router.post("/user/cash-order", authCheck, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const userCart = await Cart.findOne({ orderedBy: user._id }).exec();

  const discount = userCart.totalDiscount || 0;

  let paymentIntent = {
    id: uniqid(),
    amount: (userCart.totalPrice - discount) * 100,
    currency: "inr",
    status: "SUCCEEDED",
    created: Date.now(),
    payment_method_types: ["cash"],
  };

  const newOrder = await new Order({
    products: userCart.products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  const product = await Product.bulkWrite(bulkOption, {});

  res.json({ ok: true });
});

module.exports = router;
