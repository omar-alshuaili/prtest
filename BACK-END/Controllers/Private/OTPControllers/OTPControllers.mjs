// REQUIRED STUFF
import jsonwebtoken from "jsonwebtoken";
import speakeasy from "speakeasy";
import UsersModel from "../../../Models/UsersModel/UsersModel.mjs";
import HODsModel from "../../../Models/HODsModel/HODsModel.mjs";
import TeachersModel from "../../../Models/TeachersModel/TeachersModel.mjs";
import StudentsModel from "../../../Models/StudentsModel/StudentsModel.mjs";
import ParentsModel from "../../../Models/ParentsModel/ParentsModel.mjs";

const Users = UsersModel;
const HODs = HODsModel;
const Teachers = TeachersModel;
const Students = StudentsModel;
const Parents = ParentsModel;

const Controllers = {
  verifyOTP: async (x, token) => {
    // DECODING ACCESS TOKEN
    const decodedAccessToken = jsonwebtoken.decode(token);
    const { _id, role } = decodedAccessToken.user;

    // CHECKING CREDENTIALS
    let userLoggedIn = null;

    switch (role) {
      case "ADMIN":
        await Users.findById(_id)
          .then((result) => {
            userLoggedIn = result;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
        break;

      case "HOD":
        await HODs.findById(_id)
          .then((result) => {
            userLoggedIn = result;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
        break;

      case "TEACHER":
        await Teachers.findById(_id)
          .then((result) => {
            userLoggedIn = result;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
        break;

      case "STUDENT":
        await Students.findById(_id)
          .then((result) => {
            userLoggedIn = result;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
        break;

      case "PARENT":
        await Parents.findById(_id)
          .then((result) => {
            userLoggedIn = result;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
        break;

      default:
        return { message: "Invalid role selected.", messageType: "error" };
    }

    if (userLoggedIn) {
      const verified = speakeasy.totp.verify({
        secret: userLoggedIn.otpString,
        encoding: "base32",
        token: x.otp,
      });
      return verified ? { message: "Successfully logged in.", messageType: "success", token, isAuthenticated: true } : { message: "OTP is invalid.", messageType: "error", token, isAuthenticated: false };
    }
    return { message: "Invalid user.", messageType: "error" };
  }
}

export default Controllers;