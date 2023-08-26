// REQUIRED STUFF
import AttendancesModel from "../../../Models/AttendancesModel/AttendancesModel.mjs";
import TeachersModel from "../../../Models/TeachersModel/TeachersModel.mjs";
import StudentsModel from "../../../Models/StudentsModel/StudentsModel.mjs";

const Attendances = AttendancesModel;
const Teachers = TeachersModel;
const Students = StudentsModel;

const Controllers = {

  // CREATE NEW ATTENDANCE
  createNewAttendance: async (x) => {
    let alreadyExist = await Attendances.findOne({ lesson: x.lesson,subject: x.subject, class: x.class, day: x.day, month: x.month, year: x.year });
    if (alreadyExist) return { message: "Attendance with this info is already created.", messageType: "warning" };

    // Create a new attendance document with the given details
    let attendance = new Attendances({
      lesson: x.lesson,
      topic: x.topic,
      department: x.department,
      class: x.class,
      teacher: x.teacher,
      subject: x.subject,
      day: x.day,
      month: x.month,
      year: x.year
    });

    // ADDING ATTENDANCE TO THE TEACHERS ARRAY
    await Teachers.findById(x.teacher).then((teacher) => {
      teacher.attendances.push(attendance);
      teacher.save();
    })

    // ADD STUDENTS IDs TO ATTENDANCE ARRAY
    x.students.forEach(async (student) => {
      attendance.students.push({
        student: student.student,
        isPresent: student.isPresent
      });

      // ADDING INDIVIDUAL ATTENDANCE TO EACH STUDENT
      await Students.findById(student.student).then((obj) => {
        obj.attendances.push({
          attendance: attendance,
          isPresent: student.isPresent
        });
        obj.save();
      });
    });

    attendance = await attendance.save();

    return attendance ? { message: "New attendance has been created.", messageType: "success" } : { message: "Couldn't create the new attendance.", messageType: "error" };
  },

  // GET SPECIFIC ATTENDANCE WITH ID
  getSingleAttendance: async (id) => {
    const response = await Attendances.findById(id, { isDeleted: false }).select("-__v")
      .populate({ path: "class", select: "title year" })
      .populate({ path: "department", select: "name" })
      .populate({ path: "teacher", select: "firstName lastName" })
      .populate({ path: "subject", select: "title code" })
      .populate({ path: "students.student", select: "firstName lastName" })
      .then((attendance) => {
        return attendance ? { message: "Got the attendance.", messageType: "success", attendance } : { message: "Attendance you're looking for is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET ATTENDANCE OF PARTICULAR CLASS
  getAttendanceWithClass: async (classId) => {
    const response = await Attendances.find({ class: classId, isDeleted: false }).select("-__v")
      .then((attendances) => {
        return attendances.length ? { message: "Got the attendances for the class.", messageType: "success" } : { message: "Data for the attendance is not found", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET FILTERED ATTENDANCE(S)
  getFilteredAttendances: async (x) => {
    const response = await Attendances.find(x).select("-__v")
      .populate({ path: "class", select: "title year" })
      .populate({ path: "department", select: "name" })
      .populate({ path: "teacher", select: "firstName lastName" })
      .populate({ path: "subject", select: "title code" })
      .populate({ path: "students.student", select: "firstName lastName" })
      .then((result) => {
        return result.length ? { message: "Attendance found successfully.", messageType: "success", result } : { message: "The data you're looking for is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // UPDATE EXISTING ATTENDANCE
  updateAttendance: async (id, x) => {
    const response = await Attendances.findByIdAndUpdate(id, x, { new: true })
      .then(async (updated) => {
        if (updated) {
          // UPDATE THE STUDENT ATTENDANCE
          if (x.students && x.students.length) {
            for (let i = 0; i < x.students.length; i++) {
              const studentId = x.students[i].student;
              const isPresent = x.students[i].isPresent;

              const student = await Students.findById(studentId);
              if (student) {
                const attendanceIndex = student.attendances.findIndex((a) => a.attendance.toString() === updated._id.toString());

                if (attendanceIndex !== -1) {
                  student.attendances[attendanceIndex].isPresent = isPresent;
                  await student.save();
                }
              }
            }

          }
          return { message: "Updates saved successfully.", messageType: "success" };
        } else {
          return { message: "Attendance data not found.", messageType: "error" };
        }
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // DELETE EXISTING ATTENDANCE - SOFT DELETE
  delAttendanceSoft: async (id) => {
    const response = await Attendances.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((deleted) => {
        return deleted ? { message: "Attendance deleted successfully.", messageType: "success" } : { message: "Attendance data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // DELETE EXISTING ATTENDANCE - PERMANENT DELETE
  delAttendancePermanent: async (id) => {
    const response = await Attendances.findByIdAndDelete(id)
      .then((deleted) => {
        return deleted ? { message: "Attendance deleted permanently.", messageType: "success" } : { message: "Attendance data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  }
}

export default Controllers;