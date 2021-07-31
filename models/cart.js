const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        price: Number,
      },
    ],
    totalPrice: Number,
    discountedPrice: Number,
    totalDiscount: Number,
    orderedBy: { type: ObjectId, ref: "User" },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
