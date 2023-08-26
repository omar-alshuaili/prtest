// REQUIRED STUFF
import mongoose from "mongoose";

const subjectsSchema = mongoose.Schema({
  title: {type: String, required: true},
  code: {type: String, required: true},
  department: {type: mongoose.Types.ObjectId, ref: "Departments", required: true},
  info: [{
    teacher: {type: mongoose.Types.ObjectId, ref: "Teachers"},
    class: {type: mongoose.Types.ObjectId, ref: "Classes"}
  }],
  isDeleted: {type: Boolean, default: false}
});

// VIRTUALS

// WITH TEACHER
subjectsSchema.virtual("teacherId", {
  ref: "Teachers",
  localField: "teacher",
  foreignField: "_id",
  justOnce: true
});

// WITH DEPARTMENT
subjectsSchema.virtual("departmentId", {
  ref: "Departments",
  localField: "department",
  foreignField: "_id",
  justOnce: true
});

// WITH 
subjectsSchema.virtual("classId", {
  ref: "Classes",
  localField: "class",
  foreignField: "_id",
  justOnce: true
});

export default mongoose.model("Subjects", subjectsSchema);