const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getAllUsers,
} = require("../controllers/authController");
const { protect, authorize } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Route untuk mendapatkan semua user, hanya bisa diakses oleh admin atau dokter
router.get("/users", protect, authorize("admin", "dokter"), getAllUsers);

module.exports = router;
