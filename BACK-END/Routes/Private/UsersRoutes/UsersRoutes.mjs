// REQUIRED STUFF
import { Router } from "express";

const router = Router();

// CREATE USER
router.post("/users/create", validateToken, async (req, res) => {
  try {
    // console.log('next - create');
    return null;
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
})

export default router;

// TOKEN VALIDATION - ROUTE MIDDLEWARE
function validateToken(req, res, next) {
  try {
    // GET ACCESS TOKEN FROM REQUEST HEADERS
    const accessToken = req.headers["authorization"].split(" ")[1];

    // DECODING ACCESS TOKEN
    const decodedAccessToken = jwtDecode(accessToken);

    // IF EXPIRED RETURN WITH RESPONSE
    if(decodedAccessToken.exp * 1000 < Date.now()) {
      res.send({message: "Your token has been expired.", })
    }
  } catch (error) {
    
  }
}