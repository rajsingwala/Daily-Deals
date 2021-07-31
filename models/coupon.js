const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is Required",
      unique: true,
      uppercase: true,
      minlength: [6, "Too Short"],
      maxlength: [15, "Too Long"],
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
