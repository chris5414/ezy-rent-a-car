const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    images: {
      front: String,
      left: String,
      right: String,
    },
    unavailable: [String],
  },

  { timestamps: true },
  { collection: "owners" }
);

const Owner = mongoose.model("Owner", OwnerSchema);

module.exports = Owner;
