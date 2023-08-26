// REQUIRED STUFF
import UsersModel from "../../Models/UsersModel/UsersModel.mjs";
import HODsModel from "../../Models/HODsModel/HODsModel.mjs";
import TeachersModel from "../../Models/TeachersModel/TeachersModel.mjs";
import StudentsModel from "../../Models/StudentsModel/StudentsModel.mjs";
import ParentsModel from "../../Models/ParentsModel/ParentsModel.mjs";
import jsonwebtoken from "jsonwebtoken";
import speakeasy from "speakeasy";
import qrcode from "qrcode";
import { GenerateHash, CompareHash, compareHash, generateHash } from "../../Utilities/HashUtilities.mjs";
import * as dotenv from "dotenv";

// .ENV CONFIGURATION
dotenv.config();

// MODELS
const Users = UsersModel;
const HODs = HODsModel;
const Teachers = TeachersModel;
const Students = StudentsModel;
const Parents = ParentsModel;

const Controllers = {

  // REGISTER USER
  register: async (x) => {
    // GENERATE OTP STRING
    const otpString = speakeasy.generateSecret({ length: 20 });

    // CHECK IF EMAIL ALREADY EXISTS
    let alreadyExist = await Users.findOne({ email: x.email.toLowerCase() });
    if (alreadyExist) {
      console.log(alreadyExist);
      return { message: "This email is already registered", messageType: "warning" };
    }

    // HASHING PASSWORD
    const hashedPassword = await generateHash(x.password);

    // CREATING NEW USER
    let user = new Users({
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email.toLowerCase(),
      password: hashedPassword,
      role: x.role.toUpperCase(),
      otpString: otpString.base32
    });

    // SAVE USER IN DATABASE & SEND RESPONSE
    user = await user.save();
    return user ? { message: "User registered successfully.", messageType: "success" } : { message: "User couldn't registered", messageType: "error" };
  },

 // SIGN IN USER
signIn: async (x) => {
  let userLoggedIn = null;
  let userModel = null;

  // ADMIN
  if (!userLoggedIn) {
    userModel = Users;
    await userModel.findOne({ email: x.email.toLowerCase() })
      .then((result) => {
        userLoggedIn = result;
      })
      .catch(error => error);
  }

  // HOD
  if (!userLoggedIn) {
    userModel = HODs;
    await userModel.findOne({ email: x.email.toLowerCase() })
      .then((result) => {
        userLoggedIn = result;
      })
      .catch(error => error);
  }

  // TEACHER
  if (!userLoggedIn) {
    userModel = Teachers;
    await userModel.findOne({ email: x.email.toLowerCase() })
      .then((result) => {
        userLoggedIn = result;
      })
      .catch(error => error);
  }

  // STUDENT
  if (!userLoggedIn) {
    userModel = Students;
    await userModel.findOne({ email: x.email.toLowerCase() })
      .then((result) => {
        userLoggedIn = result;
      })
      .catch(error => error);
  }

  // PARENT
  if (!userLoggedIn) {
    userModel = Parents;
    await userModel.findOne({ email: x.email.toLowerCase() })
      .then((result) => {
        userLoggedIn = result;
      })
      .catch(error => error);
  }

  // FOUND USER - SEND RESPONSE WITH TOKEN
  if (userLoggedIn) {
    let checkPassword = await CompareHash(x.password, userLoggedIn.password);
    
    // If password doesn't match with bcrypt hash, check crypto hash
    if (!checkPassword) {
      checkPassword = await compareHash(x.password, userLoggedIn.password);
    
      // If the password matches the old hash, update it to the new hash
      if (checkPassword) {
        const hashedPassword = await GenerateHash(x.password);
        // Save the new password hash to the database
        await userModel.updateOne({ email: x.email }, { password: hashedPassword });
      }
    }
    
    if (checkPassword) {
      // SETUP FOR OTP & QRCODE
      const otpauth = speakeasy.otpauthURL({ secret: userLoggedIn.otpString, label: 'CMS', period: 180, encoding: "base32" });
      let QRCode = await qrcode.toDataURL(otpauth);

      const { _id, firstName, lastName, email, role } = userLoggedIn;
      const token = jsonwebtoken.sign({ user: { _id, firstName, lastName, email, role } }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return { message: "You've signed in successfully.", messageType: "success", token, isAuthenticated: false, QRCode };
    }

    return { message: "Invalid email or password.", messageType: "warning" };
  }

  // USER NOT FOUND
  return { message: "Invalid email or password.", messageType: "warning" };
}

}

export default Controllers;