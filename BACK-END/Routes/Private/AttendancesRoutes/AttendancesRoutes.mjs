// REQUIRED STUFF
import Controllers from "../../../Controllers/Private/AttendancesControllers/AttendancesControllers.mjs";
import { Router } from "express";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

// CREATE NEW ATTENDANCE
router.post("/create", validateToken, async (req, res) => {
  try {
    const data = await Controllers.createNewAttendance(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET SPECIFIC ATTENDANCE WITH ID
router.get("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getSingleAttendance(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET FILTERED ATTENDANCE(S)
router.post("/filtered", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getFilteredAttendances(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// GET ATTENDANCE WITH CLASS
router.get("/classId=:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.getAttendanceWithClass(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// UPDATE EXISTING ATTANDANCE WITH ID
router.put("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.updateAttendance(req.params.id, req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE EXISTING ATTANDANCE - SOFT DELETE
router.patch("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delAttendanceSoft(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// DELETE EXISTING ATTANDANCE - PERMANENT DELETE
router.delete("/:id", validateToken, async (req, res) => {
  try {
    const data = await Controllers.delAttendancePermanent(req.params.id);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;