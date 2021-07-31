const express = require("express");
const router = express.Router();
const Coupon = require("../models/coupon");
const { authCheck, adminCheck } = require("../middlewares/auth");
const slugify = require("slugify");

router.post("/coupon", authCheck, adminCheck, async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;

    const coupon = await new Coupon({
      name,
      expiry,
      discount,
      slug: slugify(name),
    }).save();
    res.json(coupon);
  } catch (err) {
    console.log(err);
  }
});

router.get("/coupon", async (req, res) => {
  try {
    const coupon = await Coupon.find({})
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(coupon);
  } catch (err) {
    console.log(err);
  }
});

router.get("/coupon/:slug", async (req, res) => {
  const coupon = await Coupon.findOne({ slug: req.params.slug }).exec();
  res.json(coupon);
});

router.delete("/coupon/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    const coupon = await Coupon.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(coupon);
  } catch (err) {
    console.log(err);
  }
});

router.put("/coupon/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    const coupon = await Coupon.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), expiry, discount },
      { new: true }
    ).exec();
    res.json(coupon);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
