const mongoose = require("mongoose");
const { stringify } = require("querystring");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Product Name"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "please add price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },

  rating: {
    type: Number,
    default: 0,
  },
  Image: [
    {
      public_id: {
        type: String,
        requored: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter the product category"],
  },
  stoke: {
    type: Number,
    default: 1,
    required: [true, "Please Enter The Produt Stock"],
    maxLength: [4, "Stoke cannot exceed 4 characters"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
