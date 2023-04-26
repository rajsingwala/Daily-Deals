const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Cart = require("../models/cart");
const { authCheck } = require("../middlewares/auth");
const { STRIPE_KEY } = require("../config/prod");
const stripe = require("stripe")(STRIPE_KEY);

router.post("/create-payment-intent", authCheck, async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cartDetails = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  const totalPrice = cartDetails.totalPrice;
  const discountedPrice = cartDetails.totalDiscount || 0;

  const final = (totalPrice - discountedPrice) * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: final,
    currency: "inr",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    totalPrice,
    discountedPrice,
    Payable: final,
  });
});

module.exports = router;
