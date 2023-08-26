// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/StudentsControllers/StudentsControllers.mjs";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

// ADD NEW STUDENT
router.post("/create", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addNewStudent(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL STUDENTS
router.get("/", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllStudents();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE STUDENT WITH ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleStudentDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET FULL DETAILS SINGLE STUDENT - DEPARTMENT, CLASS, SUBJECTS, TEACHERS
router.get("/:id/details", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleStudentDetails(req.params.id);
    return data ? res.send(data) : res.send(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE STUDENT DETAILS - DEPARTMENT, CLASS, PARENT
router.get("/:id/parent", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getStudentWithParentDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL STUDENTS OF THE PARTOCULAR DEPARTMENT
router.get("/by-dept/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllStudentsOfSingleDept(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL FILRTERED STUDENTS
router.post("/filtered", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllFilteredStudents(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

// UPDATE EXISTING STUDENT WIHT ID
router.put("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.updateStudent(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE EXISTING STUDENT - SOFT DELETE
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delStudentSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE EXISTING STUDENT - PERMANENT DELETE
router.delete("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delStudentPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;