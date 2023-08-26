// REQUIRED STUFF
import mongoose from "mongoose";

const classesSchema = mongoose.Schema({
  title: {type: String, required: true},
  year: {type: Number, required: true},
  department: {type: mongoose.Types.ObjectId, ref: "Departments", required: true},
  students: [{type: mongoose.Types.ObjectId, ref: "Students"}],
  info: [
    {teacher: {type: mongoose.Types.ObjectId, ref: "Teachers" },
    subject: {type: mongoose.Types.ObjectId, ref: "Subjects"}},
  ],
  exams: [{type: mongoose.Types.ObjectId}],
  isDeleted: {type: Boolean, default: false}
});

// VIRTUALS

// WITH DEPARTMENTS
classesSchema.virtual("departmentId", {
  ref: "Departments",
  localField: "department",
  foreignField: "_id",
  justOnce: true
});

// WITH SUBJECTS
classesSchema.virtual("subjectsArr", {
  ref: "Subjects",
  localField: "subjects",
  foreignField: "_id",
  justOnce: true
});

// WITH STUDENTS
classesSchema.virtual("studentsArr", {
  ref: "Students",
  localField: "students",
  foreignField: "_id",
  justOnce: true
});

// WITH EXAMS
classesSchema.virtual("examsArr", {
  ref: "Exams",
  localField: "exams",
  foreignField: "_id",
  justOnce: false
})

export default mongoose.model("Classes", classesSchema);