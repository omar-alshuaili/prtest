// REQUIRED STUFF
import ExamsModel from "../../../Models/ExamsModel/ExamsModel.mjs";
import TeachersModel from "../../../Models/TeachersModel/TeachersModel.mjs";
import StudentsModel from "../../../Models/StudentsModel/StudentsModel.mjs";

const Exams = ExamsModel;
const Teachers = TeachersModel;
const Students = StudentsModel;

const Controllers = {
  // CREATE NEW EXAM
  createNewExam: async (x) => {
    // CHECK WHETHER IT ALREADY EXISTS
    const alreadyExist = await Exams.findOne({
      title: x.title,
      totalPercentage: x.totalPercentage,
      passingPercentage: x.passingPercentage,
      teacher: x.teacher,
      department: x.department,
      class: x.class,
      subject: x.subject,
      day: x.day,
      month: x.month,
      year: x.year
    });
    if (alreadyExist) return { message: "Exam with this info already exists.", messageType: "warning" };

    // NOW CREATE NEW ONE
    let exam = await new Exams({
      title: x.title,
      totalPercentage: x.totalPercentage,
      passingPercentage: x.passingPercentage,
      teacher: x.teacher,
      department: x.department,
      class: x.class,
      subject: x.subject,
      students: x.students,
      day: x.day,
      month: x.month,
      year: x.year
    });

    exam = await exam.save();

    if (exam) {
      // ADD THIS EXAM TO TEACHERS ARRAY
      await Teachers.findByIdAndUpdate(x.teacher, { $push: { exams: exam._id } }, { new: true });

      // ADD THIS EXAM TO EACH OF THE STUDENTS
      x.students.forEach(async (student) => {
        await Students.findByIdAndUpdate(student.student, { $push: { exams: { exam: exam._id } } }, { new: true });
      });
      return { message: "New exam created successfully.", messageType: "success" };
    }
    return { message: "Couldn't create the new exam.", messageType: "error" };
  },

  // GET ALL EXAMS
  getAllExams: async () => {
    const response = await Exams.find().select("-__v")
      .then((allExams) => {
        return allExams.length ? { message: "Got all the exams.", messageType: "success", allExams } : { message: "Exams data do not exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET SINGLE EXAM WITH ID
  getSingleExam: async (id) => {
    const response = await Exams.findById(id).select("-__v")
      .then((exam) => {
        return exam ? { message: "Got the exam.", messageType: "success", exam } : { message: "Exam data you're looking for does not exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET DETAILS OF SINGLE EXAM
  getDetailsOfSingleExam: async (id) => {
    const response = await Exams.findById(id).select("-__v")
      .populate({ path: "teacher", select: "firstName lastName email" })
      .populate({ path: "class", select: "title year" })
      .populate({ path: "department", select: "name" })
      .populate({ path: "subject", select: "title code" })
      .populate({ path: "students.student", select: "firstName lastName email" })
      .then((exam) => {
        return exam ? { message: "Got the details of the exam.", messageType: "success", exam } : { message: "Exam you're looking for does not exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET FILTERED EXAMS
  getFilteredExams: async (x) => {
    const response = await Exams.find(x).select("-__v")
      .populate({ path: "teacher", select: "firstName lastName email" })
      .populate({ path: "class", select: "title year" })
      .populate({ path: "department", select: "name" })
      .populate({ path: "subject", select: "title code" })
      .populate({ path: "students.student", select: "firstName lastName email" })
      .then((exams) => {
        return exams.length ? { message: "Got the filtered exams.", messageType: "success", exams } : { message: "Exams against the filter did not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // UPDATE EXISTING EXAM
  updateExam: async (id, x) => {
    const response = await Exams.findByIdAndUpdate(id, x, { new: true })
      .then(async (updated) => {
        if (updated) {
          if (x.students && x.students.length) {
            for (const obj of x.students) {
              const filter = { _id: obj.student, "exams.exam": id };
              const update = { $set: { "exams.$.obtainedPercentage": obj.obtainedPercentage } };
              await Students.findOneAndUpdate(filter, update, { new: true });
            }
          }
          return { message: "Updates saved successfully.", messageType: "success" };
        }
        return { message: "Exam not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });
  
    return response;
  },
  
// Add result to exam
// addResultToExam: async (examId, studentId, result) => {
//   try {
//     const exam = await Exams.findById(examId);
//     if (!exam) {
//       return { message: "Exam not found.", messageType: "error" };
//     }

//     const studentIndex = exam.students.findIndex((student) => student.student.toString() === studentId);

//     if (studentIndex === -1) {
//       return { message: "Student not in the exam.", messageType: "error" };
//     }

//     exam.students[studentIndex].obtainedPercentage = result;
//     await exam.save();

//     return { message: "Exam result updated successfully.", messageType: "success" };
//   } catch (error) {
//     console.error(error);
//     return { message: "An error occurred while updating the exam result.", messageType: "error" };
//   }
// },
  // DELETE EXISTING EXAM - SOFT DELETE
  delExamSoft: async (id) => {
    const response = await Exams.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((deleted) => {
        return deleted ? { message: "Exam deleted successfully.", messageType: "success" } : { message: "Exam not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // DELETE EXISTING EXAM - PERMANENT DELETE
  delExamPermanent: async (id) => {
    const response = await Exams.findByIdAndDelete(id)
      .then((deleted) => {
        return deleted ? { message: "Exam deleted permanently.", messageType: "success" } : { message: "Exam not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  }
};

export default Controllers;