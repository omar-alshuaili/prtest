// REQUIRED STUFF
import { Router } from "express";
import Controllers from "../../Controllers/Public/PublicControllers.mjs";

const router = Router();

// REGISTER USER IN SYSTEM
router.post("/register", async (req, res) => {
  try {
    const data = await Controllers.register(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

// USER SIGN IN
router.post("/sign-in", async (req, res) => {
  try {
    const data = await Controllers.signIn(req.body);
    return data ? res.send(data) : res.sendStatus(400);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

router.get("/test", async(req, res) => {
  try {
    return res.send({message: "It is a test response from test route with GET method", messageType: "success"});
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

export default router;