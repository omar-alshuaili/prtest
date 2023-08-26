// REQUIRED STUFF
import HODsModel from "../../../Models/HODsModel/HODsModel.mjs";
import DepartmentsModel from "../../../Models/DepartmentsModel/DepartmentsModel.mjs";
import { GenerateHash } from "../../../Utilities/HashUtilities.mjs";
import speakeasy from "speakeasy";

const HODs = HODsModel;
const Departments = DepartmentsModel;

const Controllers = {

  // ADD NEW HOD
  addNewHOD: async (x) => {
    let alreadyExist = await HODs.findOne({ email: x.email });

    if (alreadyExist) return { message: "This email is already registered with another HOD.", messageType: "warning" };

    // GENERATE OTP STRING
    const otpString = speakeasy.generateSecret({ length: 20 });
    // HASHING PASSWORD
    const hashedPassword = await GenerateHash(x.password);

    let HOD = await new HODs({
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      password: hashedPassword,
      department: x.department,
      otpString: otpString.base32
    });

    // SET HOD TO THE DEPARTMENT ALSO
    if (HOD) {
      let dept = await Departments.findByIdAndUpdate(x.department, { hod: HOD._id }, { new: true });
      dept.save();
    }

    HOD = HOD.save();


    return HOD ? { message: "HOD added successfully.", messageType: "success" } : { message: "Couldn't add the HOD.", messageType: "error" };
  },

  // GET ALL HODs
  getAllHODs: async () => {
    const response = await HODs.find({ isDeleted: false }).select("-password -__v")
      .then((allHODs) => {
        return allHODs.length ? { message: "Got all HODs.", messageType: "success", allHODs } : { message: "HODs data not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // GET SINGLE HODs WITH ID
  getSingleHOD: async (id) => {
    const response = await HODs.findById(id).select("-password -__v")
      .then((HOD) => {
        return HOD ? { message: "Got the HOD.", messageType: "success", HOD } : { message: "The HOD you're looking for is not found.", messageType: "error" };
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  // UPDATE EXISTING HOD
  updatHOD: async (id, x) => {
    let updatHOD = await HODs.findByIdAndUpdate(id, {
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      password: x.password
    }, { new: true });

    return updatHOD ? { message: "Updates save successfully.", messageType: "success" } : { message: "Couldn't save the updates.", messageType: "error" };
  },

  // DELETE DEPARTMENT - SOFT DELETE
  delSoftHOD: async (id) => {
    let delSoftHOD = await HODs.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

    return delSoftHOD ? { message: "HOD deleted successfully.", messageType: "success" } : { message: "Couldn't delete the HOD.", messageType: "error" };
  },

  // DELETE DEPARTMENT - DELETE PERMANENTLY
  delDeptPermanent: async (id) => {
    let delPermanentHOD = await HODs.findByIdAndDelete(id);

    return delPermanentHOD ? { message: "HOD deleted permanently.", messageType: "success" } : { message: "Couldn't delete the HOD.", messageType: "error" };
  }
}

export default Controllers;