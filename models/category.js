const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Name is required",
      trim: true,
      minlength: [2, "Too Short"],
      maxlength: [32, "Too Long"],
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
