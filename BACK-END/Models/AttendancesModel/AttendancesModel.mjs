// REQUIRED STUFF
import mongoose from "mongoose";

const attendancesSchema = mongoose.Schema({
  lesson: {type: Number, required: true},
  topic: {type: String, required: true},
  class: {type: mongoose.Types.ObjectId, ref: "Classes", required: true},
  department: {type: mongoose.Types.ObjectId, ref: "Departments", required: true},
  subject: {type: mongoose.Types.ObjectId, ref: "Subjects", required: true},
  teacher: {type: mongoose.Types.ObjectId, ref: "Teachers", required: true},
  students: [
    {student: {type: mongoose.Types.ObjectId, ref: "Students"},
    isPresent: {type: Boolean, default: false}}
  ],
  createOn: {type: String, default: Date.now()},
  day: {type: Number},
  month: {type: String},
  year: {type: Number},
  isDeleted: {type: Boolean, default: false}
});

// VIRTUALS

// WITH CLASS
attendancesSchema.virtual("classId", {
  ref: "Classes",
  localField: "class",
  foreignField: "_id",
  justOnce: true
});

// WITH DEPARTMENT
attendancesSchema.virtual("departmentId", {
  ref: "Departments",
  localField: "department",
  foreignField: "_id",
  justOnce: true
});

// WITH SUBJECT
attendancesSchema.virtual("subjectId", {
  ref: "Subjects",
  localField: "subject",
  foreignField: "_id",
  justOnce: true
});

// WITH TEACHERS
attendancesSchema.virtual("teacherId", {
  ref: "Teachers",
  localField: "teacher",
  foreignField: "_id",
  justOnce: true
});

// WITH STUDENTS
attendancesSchema.virtual("studentsArr", {
  ref: "Students",
  localField: "student",
  foreignField: "_id",
  justOnce: true
});


export default mongoose.model("Attendances", attendancesSchema);
