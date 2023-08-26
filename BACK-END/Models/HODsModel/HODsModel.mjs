// REQUIRED STUFF
import mongoose from "mongoose";

// HODs SCHEMA
const hodsSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  department: {type: mongoose.Types.ObjectId, ref: "Departments", required: true},
  role: {type: String, default: "HOD"},
  otpString: {type: String, required: true},
  isDeleted: {type: Boolean, default: false}
});

// VIRTUALS
hodsSchema.virtual("departmentId", {
  ref: "Departments",
  localField: "department",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("HODs", hodsSchema);