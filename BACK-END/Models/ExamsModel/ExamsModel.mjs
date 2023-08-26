// REQUIRED STUFF
import mongoose from "mongoose";

const examsSchema = mongoose.Schema({
  title: { type: String, required: true },
  totalPercentage: { type: Number, default: 100 },
  passingPercentage: { type: Number, required: true },
  teacher: { type: mongoose.Types.ObjectId, required: true, ref: "Teachers" },
  class: { type: mongoose.Types.ObjectId, required: true, ref: "Classes" },
  department: { type: mongoose.Types.ObjectId, required: true, ref: "Departments" },
  subject: { type: mongoose.Types.ObjectId, required: true, ref: "Subjects" },
  students: [
    {
      student: { type: mongoose.Types.ObjectId, ref: "Students" },
      obtainedPercentage: { type: Number, default: 0 }
    }
  ],
  day: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, requird: true },
  createdOn: { type: String, default: Date.now() },
  isDeleted: { type: Boolean, default: false }
});

// VIRTUALS

// WITH TEACHER
examsSchema.virtual("teacherId", {
  ref: "Teachers",
  localField: "teacher",
  foreignField: "_id",
  justOne: true
});

// WITH CLASSES
examsSchema.virtual("classId", {
  ref: "Classes",
  localField: "class",
  foreignField: "_id",
  justOne: true
});

// WITH TEACHER
examsSchema.virtual("departmentId", {
  ref: "Departments",
  localField: "department",
  foreignField: "_id",
  justOne: true
});

// WITH STUDENTS
examsSchema.virtual("studnetsArr", {
  ref: "Students",
  localField: "students.student",
  foreignField: "_id",
  justOne: true
});

// WITH SUBJECTS
examsSchema.virtual("subjectId", {
  ref: "Subjects",
  localField: "subject",
  foreignField: "_id",
  justOne: true
});

export default mongoose.model("Exams", examsSchema);