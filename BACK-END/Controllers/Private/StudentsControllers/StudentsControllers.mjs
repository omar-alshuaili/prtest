// REQUIRED STUFF
import StudentsModel from "../../../Models/StudentsModel/StudentsModel.mjs";
import speakeasy from "speakeasy";
import { GenerateHash } from "../../../Utilities/HashUtilities.mjs";

const Students = StudentsModel;

const Controllers = {

  // ADD NEW STUDENT
  addNewStudent: async (x) => {

    // CHECK ALREADY EXISTING
    let alreadyExist = await Students.findOne({ email: x.email });
    if (alreadyExist) return { message: "This email is already regisered with another student.", messageType: "warning" };

    // GENERATE OTP STRING
    const otpString = speakeasy.generateSecret({ length: 20 });
    // HASHING PASSWORD
    const hashedPassword = await GenerateHash(x.password);

    // NOW CREATE NEW ONE
    let student = await new Students({
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      password: hashedPassword,
      rollNo: x.rollNo,
      class: x.class,
      department: x.department,
      parent: x.parent,
      otpString: otpString.base32
    });

    student = await student.save();
    return student ? { message: "New student added successfully", messageType: "success" } : { message: "Couldn't add the new student.", messageType: "error" };
  },

  // GET ALL STUDENTS
  getAllStudents: async (x) => {
    const response = await Students.find({ isDeleted: false }).select("-password -__v")
      .then((allStudents) => {
        return allStudents.length ? { message: "Got all the students.", messageType: "success", allStudents } : { message: "Students not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET SINGLE STUDENT WITH ID
  getSingleStudentDetails: async (id) => {
    const response = await Students.findById(id, { isDeleted: false }).select("-password -__v")
      .populate({ path: "department", select: "name" })
      .populate({ path: "class", select: "title year" })
      .populate({ path: "info.teacher", select: "firstName lastName email" })
      .populate({ path: "info.subject", select: "title code" })
      .populate({ path: "attendances.attendance", select: "day month year" })
      .populate({ path: "exams.exam", select: "title totalPercentage passingPercentage day month year teacher subject", populate: [{ path: "teacher", select: "firstName lastName email" }, { path: "subject", select: "title code" }] })
      .then((student) => {
        return student ? { message: "Got the student.", messageType: "success", student } : { message: "Student not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET SINGLE STUDENT DETAILS - SUBJECJTS, DEPARTMENT, CLASS, PARENTS
  getStudentWithParentDetails: async (id) => {
    const response = await Students.findById(id)
      .select("-password -__v").populate({ path: "parent", select: "-password -__v" })
      .then((student) => {
        return student ? { message: "Got the details of student.", messageType: "success", student } : { message: "Student data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET ALL FILTERED STUDENTS
  getAllFilteredStudents: async (x) => {
    const response = await Students.find(x).select("")
      .then((allStudents) => {
        return allStudents.length ? { message: "Got the filtered students.", messageType: "success", allStudents } : { message: "Students for corresponding filtered is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET ALL STUDENTS OF PARTICULAR DEPARTMENT
  getAllStudentsOfSingleDept: async (id) => {
    const response = await Students.find({ department: id, isDeleted: false }).select("-password -__v")
      .then((students) => {
        return students.length ? { message: "Got all students of the department.", messageType: "success", students } : { message: "Students for the department not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // UPDATE EXISTING STUDENT
  updateStudent: async (id, x) => {
    const response = await Students.findByIdAndUpdate(id, {
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      password: x.password,
      rollNo: x.rollNo,
      class: x.class,
      parent: x.parent
    }, { new: true }).then((student) => {
      return student ? { message: "Updates saved successfully.", messageType: "success" } : { message: "Data not found.", messageType: "error" };
    }).catch((error) => {
      return error;
    });

    return response;
  },

  // DELETE THE EXISTING STUDENT - SOFT DELETE
  delStudentSoft: async (id) => {
    const response = await Students.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((student) => {
        return student ? { message: "Student deleted successfully.", messageType: "success" } : { message: "The student you want to delete is not found.", messageType: "error" };
      }).catch((error) => {
        return error;
      });

    return response;
  },

  // DELETE THE EXISTING STUDENT - PERMANENT DELETE
  delStudentPermanent: async (id) => {
    const response = await Students.findByIdAndDelete(id)
      .then((student) => {
        return student ? { message: "Student deleted permanently.", messageType: "success" } : { message: "Couldn't delete the student.", messageType: "error" };
      }).catch((error) => {
        return error;
      });

    return response;
  }
}

export default Controllers;