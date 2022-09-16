const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a first name"]
    },
    lastName: {
      type: String,
      required: [true, "Please add a last name"]
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please add a password"]
    },
    birthDate: {
      type: Date,
      required: [true, "Please add a birth date"]
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"]
    },
    educationalLevel: {
      type: String,
      required: [true, "Please add an educational level"]
    },
    role: {
      type: String,
      required: [true, "Please add a role"]
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("User", userSchema)
