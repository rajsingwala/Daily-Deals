const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const { authCheck, adminCheck } = require("../middlewares/auth");
const slugify = require("slugify");
const User = require("../models/user");

router.post("/product", authCheck, adminCheck, async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
});

router.get("/products", async (req, res) => {
  let products = await Product.find({})
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]]);
  res.json(products);
});

router.delete("/product/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    let deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Product Delete Failed");
  }
});

router.get("/product/:slug", async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
});

router.put("/product/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
});

// router.post("/products", async (req, res) => {
//   try {
//     const { sort, order, limit } = req.body;

//     let products = await Product.find({})
//       .populate("category")
//       .populate("subs")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// });

router.post("/products", async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 4;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
});

router.get("/products/total", async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
});

router.put("/product/star/:productId", authCheck, async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();
    res.json(ratingUpdated);
  }
});

router.post("/product/related/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).exec();

    const { sort, order } = req.body;

    const related = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .exec();

    res.json(related);
  } catch (err) {
    console.log(err);
  }
});

//***********************search and filter************************

const handleQuery = async (req, res, query) => {
  const product = await Product.find({ $text: { $search: query } })
    .populate("category")
    .populate("subs")
    .exec();

  res.json(product);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category")
      .populate("subs")
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const product = await Product.find({ category })
      .populate("category")
      .populate("subs")
      .exec();
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

const handleStars = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$ratings.star" },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ]).exec((err, result) => {
    if (err) {
      console.log(err);
    }
    Product.find({ _id: result })
      .populate("category")
      .populate("subs")
      .exec((err, product) => {
        if (err) console.log(err);
        res.json(product);
      });
  });
};

const handleSub = async (req, res, sub) => {
  const product = await Product.find({ subs: sub })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

const handleShipping = async (req, res, shipping) => {
  const product = await Product.find({ shipping })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

const handleColor = async (req, res, color) => {
  const product = await Product.find({ color })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

router.post("/search/filter", async (req, res) => {
  const { query, price, category, stars, sub, color, shipping } = req.body;

  if (query) {
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }

  if (stars) {
    await handleStars(req, res, stars);
  }

  if (sub) {
    await handleSub(req, res, sub);
  }

  if (shipping) {
    await handleShipping(req, res, shipping);
  }

  if (color) {
    await handleColor(req, res, color);
  }
});

module.exports = router;
