const express = require("express")
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe
} = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

//Register a user
router.post("/", registerUser)

//Login a user
router.post("/login", loginUser)

//User data display
router.get("/me", protect, getMe)

module.exports = router
