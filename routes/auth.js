const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Product = require("../models/product");

// middleware
const { authCheck, adminCheck } = require("../middlewares/auth");

router.post("/create-or-update-user", authCheck, async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    res.json(user);
  } else {
    const newUser = await User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.json(newUser);
  }
});

router.post("/current-user", authCheck, (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new err(err);
    res.json(user);
  });
});

router.post("/current-admin", authCheck, adminCheck, (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new err(err);
    res.json(user);
  });
});

router.post("/user/checkout", authCheck, async (req, res) => {
  const { cart } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();

  const existingCart = await Cart.findOne({ orderedBy: user._id }).exec();

  if (existingCart) {
    existingCart.remove();
  }

  let products = [];

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    let priceOnDb = await Product.findById(cart[i]._id).select("price").exec();
    object.price = priceOnDb.price;

    products.push(object);
  }

  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    totalPrice = totalPrice + products[i].price * products[i].count;
  }

  const newCart = await new Cart({
    products,
    totalPrice,
    orderedBy: user._id,
  }).save();

  res.json({ ok: true });
});

router.get("/user/checkout/get", authCheck, async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product")
    .exec();
  res.json(cart);
});

router.delete("/user/checkout/empty", authCheck, async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
  res.json(cart);
});

router.post("/user/address", authCheck, async (req, res) => {
  const address = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();
  res.json({ ok: true });
});

router.post("/coupon/discount", authCheck, async (req, res) => {
  const { coupon } = req.body;

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();

  if (validCoupon === null) {
    return res.json({ err: "Invalid Coupon" });
  }

  const user = await User.findOne({ email: req.user.email }).exec();

  const { products, totalPrice } = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product")
    .exec();

  const discountedPrice = (
    totalPrice -
    (totalPrice * validCoupon.discount) / 100
  ).toFixed(2);

  const totalDiscount = (totalPrice * validCoupon.discount) / 100;

  const updatedCart = await Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { discountedPrice, totalDiscount },
    { new: true }
  ).exec();

  res.json(updatedCart);
});

router.post("/user/wishlist", authCheck, async (req, res) => {
  const { productId } = req.body;

  const wishlist = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } },
    { new: true }
  ).exec();

  res.json({ ok: true });
});

router.get("/user/wishlist", authCheck, async (req, res) => {
  const wishlist = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(wishlist);
});

router.put("/user/wishlist/:productId", authCheck, async (req, res) => {
  const { productId } = req.params;

  const wishlist = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } },
    { new: true }
  ).exec();

  res.json({ ok: true });
});

module.exports = router;
