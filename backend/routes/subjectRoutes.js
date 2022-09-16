const express = require("express")
const router = express.Router()
const {
  addSubject,
  editSubject,
  getSubjects,
  getSubjectById,
  deleteSubject
} = require("../controllers/subjectController")

//add a subject
router.post("/add", addSubject)

//edit a subject by id
router.put("/edit/:id", editSubject)

//get all subjects
router.get("/all", getSubjects)

//get a subject by id
router.get("/:id", getSubjectById)

//delete a subject by id
router.delete("/delete/:id", deleteSubject)

module.exports = router
