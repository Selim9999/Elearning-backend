const express = require("express")
const router = express.Router()
const {
  addSession,
  editSession,
  getSessions,
  getSessionById,
  deleteSession
} = require("../controllers/sessionController")

//add a session
router.post("/add", addSession)

//edit a session by id
router.put("/edit/:id", editSession)

//get all sessions
router.get("/all", getSessions)

//get a session by id
router.get("/:id", getSessionById)

//delete a session by id
router.delete("/delete/:id", deleteSession)

module.exports = router
