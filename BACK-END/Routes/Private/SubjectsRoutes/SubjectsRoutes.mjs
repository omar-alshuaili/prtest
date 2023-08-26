// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/SubjectsControllers/SubjectsControllers.mjs";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

// ADD NEW SUBJECT
router.post("/create", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addNewSubject(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL SUBJECTS
router.get("/", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllSubjects();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE SUBJECT WITH ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleSubject(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

// UPDATE THE EXISTING SUBECT
router.put("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.updateSubject(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// ADD TEACHER TO SUBJECT
router.post("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addTeacherToSubject(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE EXISTING SUBJECT - SOFT DELETE
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delSubjectSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE EXISTING SUBJECT - PERMANENT DELETE
router.delete("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delSubjectPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;