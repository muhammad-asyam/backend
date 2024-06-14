const mongoose = require("mongoose");

const biodataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  medicalHistory: { type: String, required: true },
});

const Biodata = mongoose.model("Biodata", biodataSchema);
module.exports = Biodata;
