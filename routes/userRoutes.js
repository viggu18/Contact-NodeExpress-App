const express = require("express");
const {
  registerUser,
  userLogin,
  getUserData,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", userLogin);

router.get("/current-user", validateToken, getUserData);

module.exports = router;
