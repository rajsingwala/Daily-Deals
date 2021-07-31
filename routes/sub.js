const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const Sub = require("../models/sub");
const Product = require("../models/product");
const slugify = require("slugify");

router.post("/sub", authCheck, adminCheck, async (req, res) => {
  try {
    const { name, parent } = req.body;

    const sub = await new Sub({ name, parent, slug: slugify(name) }).save();
    res.json(sub);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create SubCategory Failed");
  }
});

router.get("/subs", async (req, res) => {
  let sub = await Sub.find().sort({ createdAt: -1 }).exec();
  res.json(sub);
});

router.get("/sub/:slug", async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
});

router.put("/sub/:slug", authCheck, adminCheck, async (req, res) => {
  const { name, parent } = req.body;

  try {
    let updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Update Category Failed");
  }
});

router.delete("/sub/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    return res.status(400).send("Category Delete Failed");
  }
});

router.get("/subcategory/product/:slug", async (req, res) => {
  const subs = await Sub.findOne({ slug: req.params.slug }).exec();

  const product = await Product.find({ subs })
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();

  res.json(product);
});

module.exports = router;
