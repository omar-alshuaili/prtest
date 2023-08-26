// REQUIRED STUFF
import Controllers from "../../../Controllers/Private/ParentsControllers/ParentsControllers.mjs";
import { Router } from "express";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

// ADD NEW PARENT
router.post("/create", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addNewParent(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL PARENTS
router.get("/", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllParents();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE PARENT WITH ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleParent(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET DETAILS OF SINGLE PARENT
router.get("/:id/details", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getParentWithStudentDetails(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE EXISTING PARENT WITH ID
router.put("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.updateParent(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// ADD STUDENT FOR PARTICULAR PARENT
router.put("/:id/add-student", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addNewStudentForParent(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// ADD STUDENT FOR PARTICULAR PARENT
router.put("/:id/remove-student", validateToken, async (req, res) => {
  try {
    const data = await Controllers.removeStudentfromParent(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE EXISTING PARENT - SOFT DELETE
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delParentSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE EXISTING PARENT - PERMANENT DELETE
router.delete("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delParentPermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;