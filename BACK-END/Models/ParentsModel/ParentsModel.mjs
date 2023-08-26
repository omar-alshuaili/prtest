// REQUIRED STUFF
import mongoose from "mongoose";

const parentsSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  students: [{type: mongoose.Types.ObjectId, ref: "Students"}],
  role: {type: String, required: true, default: "PARENT"},
  otpString: {type: String, required: true},
  isDeleted: {type: Boolean, default: false}
});

// VIRTUAL
parentsSchema.virtual("studentId", {
  ref: "Students",
  localField: "students",
  foreignField: "_id",
  justOne: false
});

export default mongoose.model("Parents", parentsSchema);