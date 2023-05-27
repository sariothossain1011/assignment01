const { HashPassword, ComparePassword } = require("../helper/PasswordHash");
const UsersModel = require("../models/UsersModel");
const { CreateToken } = require("../utility/CreateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name.trim()) {
      return res
        .status(400)
        .json({ status: "fail", message: "Name is required!" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email is required!" });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        status: "fail",
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await UsersModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email already existing" });
    }

    const hashPassword = await HashPassword(password);

    const data = await new UsersModel({
      name,
      email,
      password: hashPassword,
    }).save();
    if (!data) {
      res.status(400).json({ status: "fail", message: "registration fail" });
    }

    const { password: removedPassword, ...responseData } = data.toObject();

    res.status(200).json({ status: "success", data: responseData });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.toString() });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ status: "fail", message: "Email is required!" });
    }
    if (!password || password.length < 6) {
      return res.json({
        status: "fail",
        message: "Password must be at least 6 characters long",
      });
    }

    const data = await UsersModel.findOne({ email });
    if (!data) {
      res.status(400).json({ status: "fail", message: "User not found!" });
    }

    const passwordMatch = await ComparePassword(password, data.password);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: "fail", message: "Wrong password !" });
    }

    const token = await CreateToken(data["email"]);
    const { password: removedPassword, ...responseData } = data.toObject();
    res
      .status(200)
      .json({ status: "success", token: token, data: responseData });
  } catch (error) {
    res.status(400).json({ status: "fail", data: error.toString() });
  }
};
