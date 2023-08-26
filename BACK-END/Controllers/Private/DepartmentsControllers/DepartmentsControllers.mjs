// REQUIRED STUFF
import DepartmentsModel from "../../../Models/DepartmentsModel/DepartmentsModel.mjs";

const Departments = DepartmentsModel;

const Controllers = {
  
  // CREATE NEW DEPARTEMENT
  createNewDept: async (x) => {
    let dept = await new Departments({
      name: x.name
    });
    dept = await dept.save();

    return dept ? {message: "New department created successfully.", messageType: "success"} : {message: "Couldn't create the new department.", messageType: "error"};
  },

  // GET ALL DEPARTMENTS
  getAllDepartments: async () => {
    let allDepartments = await Departments.find({isDeleted: false}).select("-__v");

    return allDepartments.length ? {message: "Got all department successfully.", messageType: "success", allDepartments} : {message: "The departments did not found.", messageType: "error"};
  },

  // GET SINGLE DEPARTMENT
  getSingleDepartment: async (id) => {
    const response = await Departments.findById(id).select("-__v")
      .then((department) => {
        return department ? {message: "Got the department.", messageType: "success", department} : {message: "The department you're looking for is not found.", messageType: "error"};
      })
      .catch((error) => {
        return error;
      });
    
    return response;
  },

  // UPDATE EXISTING DEPARTMENT
  updateDept: async (id, x) => {
    let updateDept = await Departments.findByIdAndUpdate(id, {
      name: x.name,
      hod: x.hod,
    }, {new: true});

    return updateDept ? {message: "Updates saved successfully.", messageType: "success"} : {message: "Couldn't save the updates.", messageType: "error"};
  },

  // DELETE THE DEPARTMENT - SOFT DELETE
  delDeptSoft: async (id) => {
    let delDeptSoft = await Departments.findByIdAndUpdate(id, {isDeleted: true}, {new: true});

    return delDeptSoft ? {message: "Department deleted successfully.", messageType: "success"} : {message: "Couldn't delete the departmenet.", messageType: "error"};
  },

  // DELETE THE DEPARTMENT - PERMANENT DELETE
  delDeptPermanent: async (id) => {
    let delDeptPermanent = await Departments.findByIdAndDelete(id);

    return delDeptPermanent ? {message: "Department deleted permanently.", messageType: "success"} : {message: "Couldn't delete the department", messageType: "error"};
  }
}

export default Controllers;