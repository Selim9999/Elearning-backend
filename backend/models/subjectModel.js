const mongoose = require("mongoose")

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a subject name"],
      unique: true
    },
    description: {
      type: String,
      required: [true, "Please add a description"]
    },
    //add attribute courses of type array
    courses: {
      type: Array,
      required: [true, "Please add courses"]
    },
    //add attribute exams of type array
    exams: {
      type: Array,
      required: [true, "Please add exams"]
    },
    //add attribute videos of type array
    videos: {
      type: Array,
      required: [true, "Please add videos"]
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model("Subject", subjectSchema)
