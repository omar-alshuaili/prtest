// REQUIRED STUFF
import mongoose from "mongoose";

// USERS SCHEMA
const usersSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, required: true, default: "ADMIN"},
  otpString: {type: String, required: true},
  isDeleted: {type: Boolean, default: false, required: true}
});

export default mongoose.model("Users", usersSchema);