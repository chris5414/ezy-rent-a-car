const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 12);

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ status: "error", message: "email already exists" });
    }

    const newUser = new User({
      email: req.body.email,
      password: hash,
      contact: req.body.contact,
    });

    await newUser.save();
    res.status(200).send("User created successfully.");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "not authorised" });
    }

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", message: "login failed" });
    }

    const access = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.ACCESS_SECRET,
      {
        expiresIn: "20m",
      }
    );

    const refresh = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.REFRESH_SECRET,
      {
        expiresIn: "5m",
      }
    );

    const response = { access, refresh };

    res
      .cookie("access_token", access, { httpOnly: true })
      .status(200)
      .json({ access: response.access, refresh: response.refresh, user });
  } catch (err) {
    next(err);
  }
};
