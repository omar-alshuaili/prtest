// REQUIRED STUFF
import Controllers from "../../../Controllers/Private/ClassesControllers/ClassesControllers.mjs";
import { Router } from "express";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW CLASS
router.post("/create", validateToken, async (req, res) => {
  try {
    const data = await Controllers.createNewClass(req.body);
    return data ? res.send(data) : res.send(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL CLASSES
router.get("/", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllClasses();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE CLASS WITH ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleClass(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET DETAILS OF SINGLE CLASS WITH ID
router.get("/:id/details", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getDetailsofSingleClass(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

// GET ALL CLASSES OF SINGLE DEPARTMENT
router.get("/by-department/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllClassesOfSingleDepartment(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL CLASSES FILTERED BY DEPARTMENT AND YEAR
router.post("/filtered", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllClassesByDeptAndYear(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// ADD ONE OR MANY STUDENTS TO ONE CLASS - ARRAY
router.post("/:id/add-students", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addManyStudentsToSingleClass(req.params.id, req.body.students);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// REMOVE ONE OR MANY STUDENTS TO ONE CLASS - ARRAY
router.post("/:id/remove-students", validateToken, async (req, res) => {
  try {
    const data = await Controllers.removeManyStudentsFromSingleClass(req.params.id, req.body.students);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// REMOVE ONE OR MORE STUDENTS FROM CLASS - ARRAY
router.post("/:id/remove-students", validateToken, async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

// ADD ONE OR MANY TEACHERS WITH SUBJECTS TO ONE CLASS - ARRAY
router.post("/:id/add-info", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addInfoToSingleClass(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// REMOVE ONE OR MORE TEACHERS FROM ONE CLASS - ARRAY
router.post("/:id/remove-info", validateToken, async (req, res) => {
  try {
    const data = await Controllers.removeInfoFromSingleClass(req.params.id, req.body.infoId);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE SINGLE CLASS WITH ID
router.put("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.updateClass(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE SINGLE CLASS - SOFT DELETE
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delClassSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE SINGLE CLASS - PERMANENT DELETE
router.delete("/:id", validateToken, async (req, res)=> {
  try {
    
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;