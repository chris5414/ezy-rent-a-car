const express = require("express");
const {
  createCar,
  updateCar,
  deleteCar,
  getCar,
  getCars,
  byType,
  byLocation,
} = require("../controllers/car.js");

const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../middleware/auth.js");

const Car = require("../models/Car.js");

const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createCar);

// UPDATE
router.put("/:id", verifyAdmin, updateCar);

// DELETE
router.delete("/:id", verifyAdmin, deleteCar);

// GET
router.get("/find/:id", getCar);

// GET ALL
router.get("/", getCars);

router.get("/bytype", byType);

router.get("/bylocation", byLocation);

module.exports = router;
