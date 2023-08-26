// REQUIRED STUFF
import mongoose from "mongoose";

// DEPARTMENTS SCHEMA
const departmentsSchema = mongoose.Schema({
  name: {type: String, required: true},
  hod: {type: mongoose.Types.ObjectId, ref: "HODs"},
  isDeleted: {type: Boolean, default: false}
});

// VIRTUALS
departmentsSchema.virtual("headId", {
  ref: "HODs",
  localField: "hod",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("Departments", departmentsSchema);