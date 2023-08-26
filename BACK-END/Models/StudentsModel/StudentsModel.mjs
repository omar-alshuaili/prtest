// REQUIRED STUFF
import mongoose from "mongoose";

const studentsSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  // rollNo: {type: String, required: true},
  department: {type: mongoose.Types.ObjectId, ref: "Departments", required: true},
  class: {type: mongoose.Types.ObjectId, ref: "Classes"},
  info: [
    {teacher: {type: mongoose.Types.ObjectId, ref: "Teachers" },
    subject: {type: mongoose.Types.ObjectId, ref: "Subjects"}},
  ],
  attendances: [
    {attendance: {type: mongoose.Types.ObjectId, ref: "Attendances"},
    isPresent: { type: Boolean}}
  ],
  exams: [
    {exam: {type: mongoose.Types.ObjectId, ref: "Exams"},
    obtainedPercentage: {type: Number, default: 0}}
  ],
  parent: {type: mongoose.Types.ObjectId, ref: "Parents"},
  role: {type: String, default: "STUDENT"},
  otpString: {type: String, required: true},
  isDeleted: {type: Boolean, default: false}
});

// VIRTUAL

// WITH DEPARTMENT
studentsSchema.virtual("departmentId", {
  ref: "Departments",
  localField: "department",
  foreignField: "_id",
  justOne: true
});

// WITH TEACHER
studentsSchema.virtual("teacherId", {
  ref: "Teachers",
  localField: "teacher",
  foreignField: "_id",
  justOne: true
});

// WITH CLASS
studentsSchema.virtual("classId", {
  ref: "Classes",
  localField: "class",
  foreignField: "_id",
  justOne: true
});

// WITH SUBJECTS
studentsSchema.virtual("subjectsArr", {
  ref: "Subjects",
  localField: "subjects",
  foreignField: "_id",
  justOne: true
});

// WITH ATTENDANCES
studentsSchema.virtual("attendanceArr", {
  ref: "Attendances",
  localField: "attendances",
  foreignField: "_id",
  justOne: true
});

// WITH PARENT
studentsSchema.virtual("parentId", {
  ref: "Parents",
  localField: "parent",
  foreignField: "_id",
  justOne: true
});

// WITH EXAMS
studentsSchema.virtual("examsArr", {
  ref: "Exams",
  localField: "exams",
  foreignField: "_id",
  justOne: false
})

export default mongoose.model("Students", studentsSchema);