const Biodata = require("../models/Biodata");
const User = require("../models/User");

exports.createBiodata = async (req, res) => {
  const { name, age, address, medicalHistory } = req.body;
  try {
    const biodata = new Biodata({
      user: req.user.id,
      name,
      age,
      address,
      medicalHistory,
    });
    await biodata.save();
    res.status(201).json(biodata);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.find().populate("user", "username");
    res.status(200).json(biodata);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findOne({ user: req.user.id }).populate(
      "user",
      "username"
    );
    if (!biodata) {
      return res.status(404).json({ message: "Biodata not found" });
    }
    res.status(200).json(biodata);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
