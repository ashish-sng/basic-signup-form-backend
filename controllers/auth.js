const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;

    // Check if the required fields are provided
    if (!firstName || !lastName || !email || !username || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Check if a user with the same username already exists
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res.status(409).json({ error: "Username already exists" });
    }

    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate and return the JWT token after sign up
    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 300,
    });
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};