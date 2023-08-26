// REQUIRED STUFF
import TeachersModel from "../../../Models/TeachersModel/TeachersModel.mjs";
import speakeasy from "speakeasy";
import { GenerateHash } from "../../../Utilities/HashUtilities.mjs";

const Teachers = TeachersModel;

const Controllers = {

  // ADD NEW TEACHER
  addNewTeacher: async (x) => {
    let alreadyExist = await Teachers.findOne({ email: x.email });

    if (alreadyExist) {
      return { message: "This email is already registred.", messageType: "warning" };
    }

    // GENERATE OTP STRING
    const otpString = speakeasy.generateSecret({ length: 20 });
    // HASHING PASSWORD
    const hashedPassword = await GenerateHash(x.password);

    let teacher = await new Teachers({
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      password: hashedPassword,
      department: x.department,
      otpString: otpString.base32
    });
    teacher = await teacher.save();

    return teacher ? { message: "Teacher has been registered successfully.", messageType: "success" } : { message: "Couldn't register the teacher.", messageType: "error" };
  },

  // GET ALL TEACHERS
  getAllTeachers: async () => {
    const response = await Teachers.find({ isDeleted: false }).select("-password -__v")
      .then((teachers) => {
        return teachers.length ? { message: "Got all the teacers.", messageType: "success", teachers } : { message: "Data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET SINGLE TEACHER WITH ID
  getSingleTeacher: async (id) => {
    const response = await Teachers.findById(id).select("-password -__v")
      .then((teacher) => {
        return teacher ? { message: "Got the teacher.", messageType: "success", teacher } : { message: "Teacher you're looking for is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET DETAILS OF SINGLE TEACHER - SUBJECT, CLASSES, EXAMS, ATTENDANCES
  getDetailsOfSingleTeacher: async (id) => {
    const response = await Teachers.findById(id)
      .select("-password -__v")
      .populate("department", "name")
      .populate("info.subject", "title code")
      .populate("info.class", "title year")
      .populate("attendances")
      .populate("exams", "title totalMarks passingMarks day month year")
      .then((teacher) => {
        return teacher ? { message: "Got the teacher details.", messageType: "success", teacher } : { message: "Teacher not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // UPDATE TEACHER'S DATA
  updateTeacher: async (id, x) => {
    let updateTeacher = await Teachers.findByIdAndUpdate(id, {
      firstName: x.firstName,
      lastName: x.lastName,
      password: x.password,
      email: x.email
    }, { new: true });

    return updateTeacher ? { message: "Updates saved successfully.", messageType: "success" } : { message: "Couldn't update the teacher.", messageType: "error" };
  },

  // ADD SUBJECT AND CLASSES TO THE PARTICULAR TEACHER
  addSubjectsNClassesToTeacher: async (id, x) => {
    let addSubjectsNClasses = await Teachers.findByIdAndUpdate(id, {}, { new: true });


  },

  // REMOVE SUBJECTS AND CLASSES OF THE PARTICULAR TEACHER
  removeSubjectsNClassesOfTeacher: async (id, x) => {
    let removeSubjectNClasses = await Teachers.findByIdAndUpdate(id, {}, { new: true });


  },

  // SOFT DELETE THE TEACHER
  delSoftTeacher: async (id) => {
    let delTeacherSoft = await Teachers.findByIdAndUpdate(id, {
      isDeleted: true
    }, { new: true });

    return delTeacherSoft ? { message: "Teacher deleted successfully.", messageType: "success" } : { message: "Couldn't delete the teacher.", messageType: "error" };
  },

  // DEL PERMANENTLY THE TEACHER
  delTeacherPermanent: async (id) => {
    let delTeacherPermanent = await Teachers.findByIdAndDelete(id);

    return delTeacherPermanent ? { message: "Teacher deleted permanently.", messageType: "success" } : { message: "Couldn't delete the teacher.", messageType: "error" };
  }
}

export default Controllers;