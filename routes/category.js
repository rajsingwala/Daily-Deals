const express = require("express");
const router = express.Router();
const { authCheck, adminCheck } = require("../middlewares/auth");
const Category = require("../models/category");
const Product = require("../models/product");
const Sub = require("../models/sub");
const slugify = require("slugify");

router.post("/category", authCheck, adminCheck, async (req, res) => {
  try {
    const { name } = req.body;

    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Category Failed");
  }
});

router.get("/categories", async (req, res) => {
  let category = await Category.find().sort({ createdAt: -1 }).exec();
  res.json(category);
});

router.get("/category/:slug", async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  res.json(category);
});

router.put("/category/:slug", authCheck, adminCheck, async (req, res) => {
  const { name } = req.body;

  try {
    let updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Update Category Failed");
  }
});

router.delete("/category/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
  } catch (err) {
    return res.status(400).send("Category Delete Failed");
  }
});

router.get("/category/subs/:_id", (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, sub) => {
    if (err) console.log(err);
    res.json(sub);
  });
});

router.get("/category/product/:slug", async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).exec();

  const product = await Product.find({ category })
    .sort([["createdAt", "desc"]])
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
});

module.exports = router;
