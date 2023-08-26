// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/DepartmentsControllers/DepartmentsControllers.mjs";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW DEPARTMENT
router.post("/create", validateToken, async (req, res) => {
  try {
    const data = await Controllers.createNewDept(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL DEPARTMENTS
router.get("/", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllDepartments();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE DEPARTMENT WITH ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleDepartment(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE EXISTING DEPARTMENT
router.put("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.updateDept(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE DEPARTMENT - SOFT DELETE
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delDeptSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE DEPARTMENT - DELETE PERMANENTLY
router.delete("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delDeptPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;