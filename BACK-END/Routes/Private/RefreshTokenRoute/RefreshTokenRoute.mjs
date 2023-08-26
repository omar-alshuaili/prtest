// REQUIRED STUFF
import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import * as dotenv from "dotenv";
import { generateHash } from "../../../Utilities/HashUtilities.mjs";

dotenv.config();
const router = Router();

router.get("/refresh", async (req, res) => {
  try {
    generateHash("asdf")
    // GET ACCESS TOKEN FROM REQUEST HEADERS
    const accessToken = req.headers["authorization"].split(" ")[1];

    // DECODING ACCESS TOKEN
    const decodedAccessToken = jsonwebtoken.decode(accessToken);

    // IF EXPIRED, SEND REFRESH TOKEN
    if(decodedAccessToken.exp * 1000 < Date.now()) {
      const refreshToken = jsonwebtoken.sign({user: decodedAccessToken.user}, JSON.stringify(process.env.JWT_SECRET), {expiresIn: "1h"});
      return res.send({message: "You've signed in again successfully.", messageType: "success", token: refreshToken});
    }

    // IF TOKEN VALIDATION FAILED SOMEHOW, IT SENDS OLD TOKEN
    return res.send({message: "You've signed in successfully.", messageType: "success", token: accessToken});
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});

export default router;