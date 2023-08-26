// REQUIRED STUFF
import ParentsModel from "../../../Models/ParentsModel/ParentsModel.mjs";
import StudentsModel from "../../../Models/StudentsModel/StudentsModel.mjs";
import mongoose from "mongoose";
import speakeasy from "speakeasy";
import { GenerateHash } from "../../../Utilities/HashUtilities.mjs";

const Parents = ParentsModel;
const Students = StudentsModel;

const Controllers = {

  // ADD NEW PARENT
  addNewParent: async (x) => {
    const alreadyExist = await Parents.findOne({ email: x.email });
    if (alreadyExist) return { message: "This email is already registered with another user.", messageType: "warning" };

    // GENERATE OTP STRING
    const otpString = speakeasy.generateSecret({ length: 20 });
    // HASHING PASSWORD
    const hashedPassword = await GenerateHash(x.password);

    // NOW CREATE A NEW ONE
    let parent = await new Parents({
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      password: hashedPassword,
      student: x.student,
      otpString: otpString.base32
    });
    parent = await parent.save();

    return parent ? { message: "New parent added successfully.", messageType: "success" } : { message: "Couldn't create the new parent.", messageType: "error" };
  },

  // GET ALL PARENTS
  getAllParents: async () => {
    const response = await Parents.find({ isDeleted: false }).select("-password -__v")
      .then((parents) => {
        return parents.length ? { message: "Got all the parents", messageType: "success", parents } : { message: "Parents data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET SINGLE PARENT
  getSingleParent: async (id) => {
    const response = await Parents.findById(id).select("-password -__v")
      .then((parent) => {
        return parent ? { message: "Got the parent.", messageType: "success", parent } : { message: "Parent data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET DETAILS OF SINGLE PARENTS
  getParentWithStudentDetails: async (id) => {
    const response = await Parents.findById(id)
      .populate({ path: "students", select: "-password -__v" })
      .select("-password -__v")
      .then((parentDetails) => {
        return parentDetails ? { message: "Got the parent with students details.", messageType: "success", parent: parentDetails } : { message: "Data of desired parent is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // UPDATE SINGLE PARENT
  updateParent: async (id, x) => {
    const response = await Parents.findByIdAndUpdate(id, {
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      password: x.password,
      student: x.student
    }, { new: true })
      .then((parent) => {
        return parent ? { message: "Updates saved successfully", messageType: "success" } : { message: "Data not found you want to update.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // ADD NEW STUDENT FOR PARTICULAR PARENT
  addNewStudentForParent: async (id, x) => {
    console.log(`addNewStudentForParent function called with id: ${id} and x: ${JSON.stringify(x)}`);
    try {
      const parent = await Parents.findById(id);
      if (!parent) {
        console.log(`Parent ${id} not found.`);
        return { message: "Parent not found", messageType: "error" };
      }
  
      const student = await Students.findById(x.studentId);
      if (!student) {
        console.log(`Student ${x.studentId} not found.`);
        return { message: "Student not found", messageType: "error" };
      }
  
      parent.students.push(x.studentId);
      await parent.save();
      console.log(`Student ${x.studentId} added to parent ${id}.`);
  
      student.parent = id;
      await student.save();
      console.log(`Parent ${id} added to student ${x.studentId}.`);
  
      return { message: "Student is added to parent successfully.", messageType: "success" };
    } catch (error) {
      console.log(`Error: ${error.message}`);
      return { message: error.message, messageType: "error" };
    }
  },

  // REMOVE STUDENT FROM PARTICULAR PARENT
  removeStudentfromParent: async (id, x) => {
    const response = await Parents.findByIdAndUpdate(id, { $pull: { students: x.studentId } }, { new: true })
      .then(async (parent) => {
        if (parent) {
          const student = await Students.findByIdAndUpdate(x.studentId, { parent: null }, { new: true });

          return student ? { message: "Student is removed from parent successfully.", messageType: "success" } : { message: "Data for desired parent is not found", messageType: "error" };
        }
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // DELETE THE EXISTING PARENT - SOFT DELETE
  delParentSoft: async (id) => {
    const response = await Parents.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
      .then((parent) => {
        return parent ? { message: "Parent deleted successfully", messageType: "success" } : { message: "Data you want to delete is not found", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // DELETE THE EXISTING PARENTS - PERMANENT DELETE
  delParentPermanent: async (id) => {
    const response = await Parents.findByIdAndDelete(id)
      .then((parent) => {
        return parent ? { message: "Parent deleted permanently.", messageType: "success" } : { message: "Data you want delete is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      })

    return response;
  }
}

export default Controllers;
