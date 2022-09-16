const asyncHandler = require("express-async-handler")
const Subject = require("../models/subjectModel")

//add a subject
const addSubject = asyncHandler(async (req, res) => {
  const { name, description, courses, exams, videos } = req.body

  if (!name || !description || !courses || !exams || !videos) {
    res.status(400)
    throw new Error("Please fill all the fields")
  }

  //check if subject exists
  const subjectExists = await Subject.findOne({ name })

  if (subjectExists) {
    res.status(400)
    throw new Error("Subject already exists")
  }

  const subject = await Subject.create({
    name,
    description,
    courses,
    exams,
    videos
  })

  if (subject) {
    res.status(201).json({
      _id: subject._id,
      name: subject.name,
      description: subject.description,
      courses: subject.courses,
      exams: subject.exams,
      videos: subject.videos
    })
  } else {
    res.status(400)
    throw new Error("Invalid subject data")
  }
})

//edit a subject by id
const editSubject = asyncHandler(async (req, res) => {
  const { name, description, courses, exams, videos } = req.body

  const subject = await Subject.findById(req.params.id)

  if (subject) {
    subject.name = name
    subject.description = description
    subject.courses = courses
    subject.exams = exams
    subject.videos = videos

    const updatedSubject = await subject.save()
    res.json(updatedSubject)
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

//delete a subject by id
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)

  if (subject) {
    await subject.remove()
    res.json({ message: "Subject removed" })
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

//get all subjects
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find({})
  res.json(subjects)
})

//get a subject by id
const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id)
  if (subject) {
    res.json(subject)
  } else {
    res.status(404)
    throw new Error("Subject not found")
  }
})

module.exports = {
  addSubject,
  editSubject,
  getSubjects,
  getSubjectById,
  deleteSubject
}
