// REQUIRED STUFF
import Controllers from "../../../Controllers/Private/OTPControllers/OTPControllers.mjs";
import { Router } from "express";
import { validateToken } from "../../../Auth/TokenValidator/TokenValidator.mjs";

const router = Router();

router.post("/verify-otp", validateToken, async (req, res) =>{
  try {
    // GRAB THE TOKEN FROM HEADERS
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    const data = await Controllers.verifyOTP(req.body, token);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;