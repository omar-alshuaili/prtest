// REQUIRED STUFF
import SubjectsModel from "../../../Models/SubjectsModel/SubjectsModel.mjs";

const Subjects = SubjectsModel;

const Controllers = {

  // ADD NEW SUBJECT
  addNewSubject: async (x) => {
    // TITLE ALREADY EXISTS
    let alreadyTitle = await Subjects.findOne({title: x.title});
    if(alreadyTitle) return {message: "Title for this subject is already registered.", messageType: "warning"};

    // SUBJECT CODE ALREADY EXISTS
    let alreadyCode = await Subjects.findOne({code: x.code});
    if(alreadyCode) return {message: "Code for this subject is already registered", messageType: "warning"};

    // NOW CREATE NEW SUBJECT
    let subject = await new Subjects({
      title: x.title,
      code: x.code,
      department: x.department
    });
    subject = await subject.save();
    return subject ? {message: "Subject added successfully.", messageType: "success"} : {message: "Couldn't add the subject.", messageType: "error"};
  },

  // GET ALL SUBJECTS
  getAllSubjects: async () => {
    const allSubjects = await Subjects.find({isDeleted: false});

    return allSubjects.length ? {message: "Got all the subjects.", messageType: "success", allSubjects} : {message: "Couldn't get the subjects.", messageType: "error"};
  },

  // GET SINGLE SUBJECT WITH ID
  getSingleSubject: async (id) => {
    let subject = await Subjects.findById(id)
      .then((result) => {
        return result ? {message: "Got the subject.", messageType: "success", subject: result} : {message: "Subject not found.", messageType: "error"};
      })
      .catch((error) => {
        return error;
      });
      return subject;
  },

  // UPDATE THE EXISING SUBJECT
  updateSubject: async (id, x) => {
    let updateSubject = await Subjects.findByIdAndUpdate(id, {
      title: x.title,
      code: x.code,
      deparment: x.deparment
    }, {new: true});

    return updateSubject ? {message: "Updates saved successfully.", messageType: "success"} : {message: "Couldn't save the updates.", messageType: "error"};
  },

  // ADD A TEACHER TO PARTICULAR SUBJECT
  addTeacherToSubject: async (id, x) => {

  },

  // REMOVER A TEACHER FROM PARTICULAR SUBJECT
  removeTeacherFromSubject: async (id, x) => {

  },

  // DELETE THE SUBJECT - SOFT DELETE
  delSubjectSoft: async (id) => {
    let delSubjectSoft = await Subjects.findByIdAndUpdate(id, {isDeleted: true}, {new: true});

    return delSubjectSoft ? {message: "Subject deleted successfully.", messageType: "success"} : {message: "Couldn't delete the subject.", messageType: "error"};
  },

  // DELETET THE SUBJECT - PERMANENT DELETE
  delSubjectPermanent: async (id) => {
    let delSubjectPermanent = await Subjects.findByIdAndDelete(id);

    return delSubjectPermanent ? {message: "Subject deleted permanently.", messageType: "success"} : {message: "Couldn't delete the subject.", messageType: "error"};
  }
}

export default Controllers;