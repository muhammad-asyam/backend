const User = require("../models/User");
const jwt = require("jsonwebtoken");
const validator = require("validator");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validasi input
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ error: "Please provide a valid email address" });
  }

  try {
    const user = new User({ username, email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      return res
        .status(400)
        .json({ error: "Username or Email already exists" });
    }
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Menggunakan JWT_SECRET dari .env file
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful" });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Mengambil semua user kecuali password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
