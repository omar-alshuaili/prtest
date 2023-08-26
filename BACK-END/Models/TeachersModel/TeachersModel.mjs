// REQUIRED STUFF
import mongoose from "mongoose";

const teachersSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  department: {type: mongoose.Types.ObjectId, ref: "Departments",requierd: true},
  info: [{
    subject: {type: mongoose.Types.ObjectId, ref: "Subjects"},
    class: {type: mongoose.Types.ObjectId, ref: "Classes"}
  }],
  attendances: [{type: mongoose.Types.ObjectId, ref: "Attendances"}],
  exams: [{type: mongoose.Types.ObjectId, ref: "Exams"}],
  role: {type: String, default: "TEACHER", required: true},
  otpString: {type: String, required: true},
  isDeleted: {type: Boolean, default: false}
});

// VIRTUALS

// WITH DEPARTMENT
teachersSchema.virtual("departmentId", {
  ref: "Departments",
  localField: "department",
  foreignField: "_id",
  justOne: true
});

// WITH SUBJECT
teachersSchema.virtual("subjectId", {
  ref: "Subjects",
  localField: "subject",
  foreignField: "_id",
  justOne: true
});

// WITH CLASS
teachersSchema.virtual("classId", {
  ref: "Classes",
  localField: "class",
  foreignField: "_id",
  justOne: true
});

// WITH ATTENDANCES
teachersSchema.virtual("attendanceArr", {
  ref: "Attendances",
  localField: "attendances",
  foreignField: "_id",
  justOne: true
});

// WITH EXAMS 
teachersSchema.virtual("examsArr", {
  ref: "Exams",
  localField: "exams",
  foreignField: "_id",
  justOne: false
});

export default mongoose.model("Teachers", teachersSchema);