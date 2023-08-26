// REQUIRED STUFF
import ClassesModel from "../../../Models/ClassesModel/ClassesModel.mjs";
import StudentsModel from "../../../Models/StudentsModel/StudentsModel.mjs";
import TeachersModel from "../../../Models/TeachersModel/TeachersModel.mjs";
import SubjectsModel from "../../../Models/SubjectsModel/SubjectsModel.mjs";

const Classes = ClassesModel;
const Students = StudentsModel;
const Teachers = TeachersModel;
const Subjects = SubjectsModel;

const Controllers = {

  // CREATE NEW CLASS
  createNewClass: async (x) => {
    const alreadyExist = await Classes.findOne({ title: x.title, year: x.year, department: x.department });
    if (alreadyExist) return { message: "Class with this data already exists.", messageType: "warning" };

    // NOW CREATE NEW ONE
    let classNew = await new Classes({
      title: x.title,
      year: x.year,
      department: x.department
    });
    classNew = await classNew.save();

    return classNew ? { message: "New class has been created.", messageType: "success" } : { message: "Something went wrong while creating new class.", messageType: "error" };
  },

  // GET ALL CLASSES
  getAllClasses: async () => {
    const response = await Classes.find({ isDeleted: false }).select("-__v")
      .then((classes) => {
        return classes.length ? { message: "Got the classes.", messageType: "success", classes } : { message: "Classes data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET ALL CLASSES OF SINGLE DEPARTMENT
  getAllClassesOfSingleDepartment: async (id) => {
    const response = await Classes.find({ department: id, isDeleted: false }).select("-__v")
      .then((classes) => {
        return classes.length ? { message: "Got the classes of the department.", messageType: "success", classes } : { message: "Classes for the department did not exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET ALL CLASSES BY DEPARTMENT AND YEAR
  getAllClassesByDeptAndYear: async (x) => {
    const response = await Classes.find(x).select("-__v")
      .then(async (classes) => {
        if (classes.length) {
          const students = await Students.find({ department: x.department, isDeleted: false });
          return { message: "Got all the classes by department & year.", messageType: "success", classes, students };
        }
        return { message: "Classes for the department or year do not exist.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET SINGLE CLASSES WITH ID
  getSingleClass: async (id) => {
    const response = await Classes.findById(id).select("-__v")
      .then((x) => {
        return x ? { message: "Got the class", message: "success", class: x } : { message: "Class you're looking for is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  getDetailsofSingleClass: async (id) => {
    const response = await Classes.findById(id).select("-__v")
      .populate({ path: "department", select: "name" })
      .populate({ path: "students", select: "firstName lastName email" })
      .populate({path: "info.teacher", select: "firstName lastName email"})
      .populate({path: "info.subject", select: "title code"})
      .then((result) => {
        return result ? { message: "Got class details successfully.", messageType: "success", class: result } : { message: "Class not found.", messageType: "error" };
      })
      .catch((error) => {
        return { message: error.message, messageType: "error" };
      });

    return response;
  },

  // ADD MANY STUDENTS TO CLASS
  addManyStudentsToSingleClass: async (id, students) => {
    const response = await Classes.findByIdAndUpdate(id, { $push: { students: { $each: students } } }, { new: true })
      .then(async (updated) => {

        if (updated) {
          students.map(async (studentId) => {
            await Students.findByIdAndUpdate(studentId, { class: id }, { new: true });
          })

          return { message: "Students added to the class successfully.", messageType: "success" }
        }
        return { message: "Class not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // REMOVE MANY STUDENTS FROM A CLASS
  removeManyStudentsFromSingleClass: async (id, studentIds) => {
    const response = await Classes.findByIdAndUpdate(id, { $pull: { students: { $in: studentIds } } }, { new: true })
      .then((updated) => {
        return updated ? { message: "Students removed from the class successfully.", messageType: "success" } : { message: "Class not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // ADD ONE TEACHER AND SUBJECT TO ONE CLASS
  addInfoToSingleClass: async (id, obj) => {
    const response = await Classes.findByIdAndUpdate(id, { $push: { info: { $each: [obj] } } }, { new: true })
      .then(async (updated) => {
        if (updated) {
          const addToTeacher = await Teachers.findByIdAndUpdate(obj.teacher, { info: [{ subject: obj.subject, class: id }] }, { new: true });

          // ADD SUBJECT-TEACHER INFO TO THE STUDENTS OF THAT CLASS
          if (addToTeacher) {
            const students = await Students.find({ class: id })

            students.map(async (student) => {
              await Students.findByIdAndUpdate(student._id, { $push: { info: obj } })
            });

            // ADD SUBJECT-CLASS INFO TO THE SUBJECT
            await Subjects.findByIdAndUpdate(obj.subject, {}, { new: true })
          }
          return addToTeacher ? { message: "Teacher and subject added to the class successfully.", messageType: "success" } : { message: "Couldn't label with the teacher", messageType: "error" };
        }

        return { message: "Class not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // REMOVE ONE OR MANY TEACHERS AND SUBJECTS FROM ONE CLASS
  removeInfoFromSingleClass: async (id, infoId) => {
    const response = await Classes.findByIdAndUpdate(id, { $pull: { info: { _id: infoId } } }, { new: true })
      .then((updated) => {
        return updated ? { message: "Teacher and subject removed from the class successfully.", messageType: "success" } : { message: "Class not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // UPDATE SINGLE CLASS WITH ID
  updateClass: async (id, x) => {
    const response = await Classes.findByIdAndUpdate(id, {
      title: x.title,
      year: x.year,
      department: x.department
    }, { new: true }).then((updated) => {
      return updated ? { message: "Class updated successfully.", messageType: "success" } : { message: "Class data not found.", messageType: "error" };
    })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // DELETE SINGLE CLASS - SOFT DELETE
  delClassSoft: async (id) => {
    const response = await Classes.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((deleted) => {
        return deleted ? { message: "Class deleted successfully.", messageType: "success" } : { message: "Class data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // DELETE SINGLE CLASS - PERMANENT DELETE
  delClassPermanent: async (id) => {
    const response = await Classes.findByIdAndDelete(id)
      .then((deleted) => {
        return deleted ? { message: "Class deleted permanently.", messageType: "success" } : { message: "Class data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  }
}

export default Controllers;