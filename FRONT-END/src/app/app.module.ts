import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { HodComponent } from './components/hod/hod.component';
import { DepartmentsComponent } from './components/admin/departments/departments.component';
import { HodsComponent } from './components/admin/hods/hods.component';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { TeachersComponent } from './components/admin/teachers/teachers.component';
import { StudentsComponent } from './components/admin/students/students.component';
import { ParentsComponent } from './components/admin/parents/parents.component';
import { SubjectsComponent } from './components/admin/subjects/subjects.component';
import { HoddashboardComponent } from './components/hod/hoddashboard/hoddashboard.component';
import { TeacherdashboardComponent } from './components/teacher/teacherdashboard/teacherdashboard.component';
import { HodParentsComponent } from './components/hod/hod-parents/hod-parents.component';
import { HodStudentsComponent } from './components/hod/hod-students/hod-students.component';
import { HodSubjectsComponent } from './components/hod/hod-subjects/hod-subjects.component';
import { HodTeachersComponent } from './components/hod/hod-teachers/hod-teachers.component';
import { TeacherStudentsComponent } from './components/teacher/teacher-students/teacher-students.component';
import { TeacherSubjectsComponent } from './components/teacher/teacher-subjects/teacher-subjects.component';
import { TeacherParentsComponent } from './components/teacher/teacher-parents/teacher-parents.component';
import { ClassesComponent } from './components/admin/classes/classes.component';
import { AttendanceComponent } from './components/admin/attendance/attendance.component';
import { TeacherAttendanceComponent } from './components/teacher/teacher-attendance/teacher-attendance.component';
import { CreateAttendanceComponent } from './components/admin/create-attendance/create-attendance.component';
import { CreateExamComponent } from './components/admin/create-exam/create-exam.component';
import { ExamComponent } from './components/admin/exam/exam.component';
import { OtpComponent } from './components/otp/otp.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminComponent,
    TeacherComponent,
    StudentComponent,
    HodComponent,
    DepartmentsComponent,
    HodsComponent,
    AdmindashboardComponent,
    TeachersComponent,
    StudentsComponent,
    ParentsComponent,
    SubjectsComponent,
    HoddashboardComponent,
    TeacherdashboardComponent,
    HodParentsComponent,
    HodStudentsComponent,
    HodSubjectsComponent,
    HodTeachersComponent,
    TeacherStudentsComponent,
    TeacherSubjectsComponent,
    TeacherParentsComponent,
    ClassesComponent,
    AttendanceComponent,
    TeacherAttendanceComponent,
    CreateAttendanceComponent,
    CreateExamComponent,
    ExamComponent,
    OtpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
