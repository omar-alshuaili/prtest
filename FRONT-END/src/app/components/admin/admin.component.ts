import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loginIUserId: any;
  createAttendanceTab: any;
  createExamTab: any;
  departmentTab: any;
  hodTab: any;
  teacherTab: any;
  selectedButton: any = '';
  userName: any;
  adminHodTabs: any;
  forStudent: any;
  classTab: any;
  subjectTab: any;
  studentTab: any;
  parentTab: any;
  activeButton: any = '';

  constructor(
    private route: Router,
  ) {
    this.loginIUserId = JSON.parse(localStorage.getItem('userId') as any);
    console.log('userId', this.loginIUserId)
  }

  ngOnInit(): void {
    this.userName = this.loginIUserId.role
    console.log(this.userName)
    if (this.userName === "ADMIN") {
      this.selectedButton = "Departments"
      this.activeButton = "Departments"
    } else if (this.userName === "HOD") {
      this.selectedButton = "Teachers"
      this.activeButton = "Teachers"
    }
    else if (this.userName === "TEACHER") {
      this.selectedButton = "Attendance"
      this.activeButton = "Attendance"
    }
    else if (this.userName === "STUDENT") {
      this.selectedButton = "Attendance"
      this.activeButton = "Attendance"
    }
    else if (this.userName === "PARENT") {
      this.selectedButton = "Attendance"
      this.activeButton = "Attendance"
    }
  }

  tabSelected(buttonValue: string) {
    this.selectedButton = buttonValue;
    this.activeButton = buttonValue;
    // this.route.navigate(['/departments'])
  }


  logout() {
    localStorage.clear();
    this.route.navigate(['/']);
  }

}
