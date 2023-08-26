import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { HodComponent } from './components/hod/hod.component';
import { DepartmentsComponent } from './components/admin/departments/departments.component';
import { OtpComponent } from './components/otp/otp.component';
const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: AdminComponent },
  { path: 'dashboard', component: HodComponent },
  { path: 'dashboard', component: TeacherComponent },
  { path: 'dashboard', component: StudentComponent },
  { path: 'dashboard', component: DepartmentsComponent },
  { path: 'verify', component: OtpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
