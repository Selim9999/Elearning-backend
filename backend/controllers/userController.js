const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    birthDate,
    phone,
    educationalLevel,
    role
  } = req.body

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !birthDate ||
    !phone ||
    !educationalLevel ||
    !role
  ) {
    res.status(400)
    throw new Error("Please fill all the fields")
  }

  //check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    birthDate,
    phone,
    educationalLevel,
    role
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

const getMe = asyncHandler(async (req, res) => {
  const { _id, firstName, lastName, email, role } = req.user

  res.status(200).json({
    _id,
    firstName,
    lastName,
    email,
    role
  })
})

//generate jwt
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe
}
