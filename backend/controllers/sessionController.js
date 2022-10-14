const asyncHandler = require("express-async-handler")
const Session = require("../models/sessionModel")

//add a session
const addSession = asyncHandler(async (req, res) => {
  const { subject, date, duration, hour, status, users } = req.body

  if (!subject || !date || !duration || !hour || !status || !users) {
    res.status(400)
    throw new Error("Please fill all the fields")
  }

  //check if session exists
  const sessionExists = await Session.findOne({ date, hour })

  if (sessionExists) {
    res.status(400)
    throw new Error("Session already exists")
  }

  const session = await Session.create({
    subject,
    date,
    duration,
    hour,
    status,
    users
  })

  if (session) {
    res.status(201).json({
      _id: session._id,
      subject: session.subject,
      date: session.date,
      duration: session.duration,
      hour: session.hour,
      status: session.status,
      users: session.users
    })
  } else {
    res.status(400)
    throw new Error("Invalid session data")
  }
})

//edit a session by id
const editSession = asyncHandler(async (req, res) => {
  const { subject, date, duration, hour, status, users } = req.body

  const session = await Session.findById(req.params.id)

  if (session) {
    session.subject = subject
    session.date = date
    session.duration = duration
    session.hour = hour
    session.status = status
    session.users = users

    const updatedSession = await session.save()
    res.json(updatedSession)
  } else {
    res.status(404)
    throw new Error("Session not found")
  }
})

//delete a session by id
const deleteSession = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id)

  if (session) {
    await session.remove()
    res.json({ message: "Session removed" })
  } else {
    res.status(404)
    throw new Error("Session not found")
  }
})

//get all sessions
const getSessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({}).populate("subject").populate("users")
  res.json(sessions)
})

//get a session by id
const getSessionById = asyncHandler(async (req, res) => {
  const session = await Session.findById(req.params.id)
    .populate("subject")
    .populate("users")
  if (session) {
    res.json(session)
  } else {
    res.status(404)
    throw new Error("Session not found")
  }
})

module.exports = {
  addSession,
  editSession,
  deleteSession,
  getSessions,
  getSessionById
}
