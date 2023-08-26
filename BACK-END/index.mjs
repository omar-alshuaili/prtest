// REQUIRED STUFF
import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";

// ROUTES
import AuthPublicRoutes from "./Routes/Public/publicRoutes.mjs";
import RefreshTokenRoute from "./Routes/Private/RefreshTokenRoute/RefreshTokenRoute.mjs";
import TeachersRoutes from "./Routes/Private/TeachersRoutes/TeachersRoutes.mjs";
import DepartmentsRoutes from "./Routes/Private/DepartmentsRoutes/DepartmentsRoutes.mjs";
import HODsRoutes from "./Routes/Private/HODsRoutes/HODsRoutes.mjs";
import SubjectsRoutes from "./Routes/Private/SubjectsRoutes/SubjectsRoutes.mjs";
import ClassesRoutes from "./Routes/Private/ClassesRoutes/ClassesRoutes.mjs";
import StudentsRoutes from "./Routes/Private/StudentsRoutes/StudentsRoutes.mjs";
import ParentsRoutes from "./Routes/Private/ParentsRoutes/ParentsRoutes.mjs";
import AttendancesRoutes from "./Routes/Private/AttendancesRoutes/AttendancesRoutes.mjs";
import ExamsRoutes from "./Routes/Private/ExamsRoutes/ExamsRoutes.mjs";
import OTPRoutes from "./Routes/Private/OTPRoutes/OTPRoutes.mjs";

// IMPORT DATABASE CONNECTION
import "./Config/db_connection.mjs";

// DOT EVN CONFIGURATION
dotenv.config();

// EXPRESS APP SETUP
const app = express();

// APP MIDDLEWARES
app.use(helmet());
// app.use(bodyParser.json());
app.use(express.json());
app.disable('x-powered-by');

// CORS MIDDLEWARE
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
  credentials: true
}));

// DELIVER ROUTES TO APP
app.use("/api/auth", AuthPublicRoutes);
app.use("/api/auth", RefreshTokenRoute);
app.use("/api/teachers", TeachersRoutes);
app.use("/api/departments", DepartmentsRoutes);
app.use("/api/hods", HODsRoutes);
app.use("/api/subjects", SubjectsRoutes);
app.use("/api/classes", ClassesRoutes);
app.use("/api/students", StudentsRoutes);
app.use("/api/parents", ParentsRoutes);
app.use("/api/attendances", AttendancesRoutes);
app.use("/api/exams", ExamsRoutes);
app.use("/api", OTPRoutes);

// APP IS RUNNING ON PORT
app.listen(process.env.PORT || 5050, ()=> {
  console.log(`Server is running on Port: ${process.env.PORT_LOCAL}`)
});