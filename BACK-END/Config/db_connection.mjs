// REQUIRED STUFF
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

// CONNECTING SERVER WITH DATABASE
mongoose.set("strictQuery", false);

mongoose.connect(process.env.DB_LOCAL_STRING || "mongodb+srv://omar:5OKA4ZE7ylh5fbEm@cluster0.u8au1eu.mongodb.net/")
  .then(() => console.log("Database is attached."))
  .catch((error) => console.log(error))