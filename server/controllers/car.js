const Car = require("../models/Car.js");

exports.createCar = async (req, res, next) => {
  const newCar = new Car(req.body);

  try {
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (err) {
    next(err);
    //   res.status(400).json(err);
  }
};
// module.exports = createCar;

exports.updateCar = async (req, res, next) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (err) {
    next(err);
    //   res.status(400).json(err);
  }
};
// module.exports = updateCar;

exports.deleteCar = async (req, res, next) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json("car has been deleted");
  } catch (err) {
    next(err);
    //   res.status(400).json(err);
  }
};
// module.exports = deleteCar;

exports.getCar = async (req, res, next) => {
  try {
    const car = await Car.findById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
};
// module.exports = getCar;

exports.getCars = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const cars = await Car.find({
      ...others,
      price: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
};
// module.exports = getCars;

exports.byType = async (req, res, next) => {
  const types = req.query.types.split(",");
  try {
    const list = await Promise.all(
      types.map((type) => {
        return Car.countDocuments({ type: type });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

// exports.byLocation = async (req, res, next) => {
//   const locations = req.query.locations.split(",");
//   try {
//     const list = await Promise.all(
//       locations.map((location) => {
//         return Car.countDocuments({ location: location });
//       })
//     );
//     res.status(200).json(list);
//   } catch (err) {
//     next(err);
//   }
// };

exports.byLocation = async (req, res, next) => {
  try {
    const westCount = await Car.countDocuments({ location: "west" });
    const eastCount = await Car.countDocuments({ location: "east" });
    const northCount = await Car.countDocuments({ location: "north" });
    const southCount = await Car.countDocuments({ location: "south" });
    const centralCount = await Car.countDocuments({ location: "central" });

    res.status(200).json([
      { location: "west", count: westCount },
      { location: "east", count: eastCount },
      { location: "north", count: northCount },
      { location: "south", count: southCount },
      { location: "central", count: centralCount },
    ]);
  } catch (err) {
    next(err);
  }
};
