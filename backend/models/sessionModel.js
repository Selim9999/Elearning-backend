const mongoose = require("mongoose")

const sessionSchema = mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.ObjectId,
      ref: "Subject",
      required: true
    },
    date: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    hour: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    users: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Session", sessionSchema)
