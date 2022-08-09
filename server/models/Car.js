const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    photos: [String],
    desc: String,
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    price: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    unavailable: [Date],
  },
  { collection: "cars" }
);

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
