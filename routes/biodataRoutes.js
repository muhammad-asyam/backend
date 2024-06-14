const express = require("express");
const router = express.Router();
const {
  createBiodata,
  getAllBiodata,
  getUserBiodata,
} = require("../controllers/biodataController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.post("/", protect, authorize("user"), createBiodata);
router.get("/", protect, authorize("dokter"), getAllBiodata);
router.get("/me", protect, authorize("user"), getUserBiodata);

module.exports = router;
