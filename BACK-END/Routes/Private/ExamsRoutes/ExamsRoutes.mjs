// REQUIRED STUFF
import Controllers from "../../../Controllers/Private/ExamsControllers/ExamsControllers.mjs";
import { Router } from "express";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW EXAM
router.post("/create", validateToken, async (req, res) => {
  try {
    const data = await Controllers.createNewExam(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// Add result to exam
// router.post("/add-result/:examId/:studentId", validateToken, async (req, res) => {
//   try {
//     const data = await Controllers.addResultToExam(req.params.examId, req.params.studentId, req.body.result);
//     return data ? res.send(data) : res.sendStatus(400);
//   } catch (error) {
//     console.log(error);
//     return res.send(error);
//   }
// });

// GET ALL EXAMS
router.get("/", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllExams();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE EXAM WITH ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleExam(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET DETAILS OF SINGLE EXAM WITH ID
router.get("/:id/details", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getDetailsOfSingleExam(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET EXAMS WITH PROVIDED FILTERING FIELDS
router.post("/filtered", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getFilteredExams(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

// UPDATE EXISTING EXAM
router.put("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.updateExam(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE EXISTING EXAM - SOFT DELETE
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delExamSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE EXISTING EXAM - PERMANENTLY DELETE
router.delete("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delExamPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;