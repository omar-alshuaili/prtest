// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../../Controllers/Private/HODsControllers/HODsControllers.mjs";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

// ADD NEW HOD
router.post("/create", validateToken, async (req, res) => {
  try {
    const data = await Controllers.addNewHOD(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ALL THE HODs
router.get("/", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAllHODs();
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SINGLE HOD WITH ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleHOD(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE THE EXISTING HOD
router.put("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.updatHOD(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE HOD - SOFT DELETE
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delSoftHOD(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE THE HOD - PERMANENT DELETE
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