// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/TeachersControllers/TeachersControllers.mjs";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW TEACHER
router.post("/create", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addNewTeacher(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL THE TEACHERS
router.get("/", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllTeachers();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE TEACHER WITH ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleTeacher(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE TEACHER WITH DETAILS
router.get("/:id/details", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getDetailsOfSingleTeacher(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

// UPDATE THE EXISTING TEACHER
router.put("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.updateTeacher(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// ADD SUBJECT AND CLASSES TO PARTICULAR TEACHER
router.put("/:id/add-subjects", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addSubjectsNClassesToTeacher(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// REMOVE SUBJECTS AND CLASSES FROM PARTICULAR TEACHER
router.put("/:id/remove-subjects", validateToken, async (req, res) => {
  try {
    const data = await Controllers.removeSubjectsNClassesOfTeacher(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE TEACHER - SOFT DELETE
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delSoftTeacher(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE TEACHER - PERMANENT DELETE
router.delete("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delTeacherPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;