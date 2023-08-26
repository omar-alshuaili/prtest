import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AttendanceService } from 'src/app/services/attendance.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { Teacher, Attendance, StudentDetails, Parent } from '../../../intefaces/attendance'; // Import the interfaces

let token = localStorage.getItem('token');

const endpoint = 'http://localhost:5050/api/attendances/filtered';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
};

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit {
  loginIUserId: any;
  result: any;
  attendanceInfo: Attendance[] = []; // Use the Attendance interface
  studentName: any;
  getStdName: any;
  lessonName: any;
  topicName: any;
  hodRole: any;
  teacherRole: any;
  studentRole: any;
  teachers: Teacher[] = []; // Use the Teacher interface
  myStudents: StudentDetails[] = []; // Use the StudentDetails interface
  selectedOption: any;
  teacherId: any;
  name: any;
  className: any;
  classYear: any;
  departmentName: any;
  parentRole: any;
  studentAttendances: Attendance[] = []; // Use the Attendance interface

  constructor(
    private http: HttpClient,
    public apiService: AttendanceService,
    public teacherService: TeachersService
  ) {
    this.loginIUserId = JSON.parse(localStorage.getItem('userId') as any);
    console.log('userId', this.loginIUserId._id);
    this.hodRole =
      this.loginIUserId.role === 'HOD' || this.loginIUserId.role === 'ADMIN'
        ? true
        : false;
    this.teacherRole = this.loginIUserId.role === 'TEACHER' ? true : false;
    this.studentRole =
      this.loginIUserId.role === 'STUDENT' ||
      this.loginIUserId.role === 'PARENT'
        ? true
        : false;
    this.parentRole = this.loginIUserId.role === 'PARENT' ? true : false;
  }

  ngOnInit(): void {
    this.getVal();
    this.getTeachers();
    this.getStudentsDetails();
    this.getSingleParent();
  }

  getTeachers() {
    this.teacherService.getTeachers().subscribe(
      (response: any) => {
        this.teachers = response.teachers;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getVal() {
    this.teacherId = this.selectedOption;
    this.getAttendance(this.teacherId);
  }

  getAttendance(t_ID: any) {
    if (this.loginIUserId.role === 'TEACHER') {
      // if (t_ID != null || undefined) {
      //   console.log(this.selectedOption);
      const formData = {
        teacher: this.loginIUserId._id,
      };
      console.log(formData);
      this.attendanceInfo = [];
      this.http.post(endpoint, formData, httpOption).subscribe(
        (response: any) => {
          response.result.forEach((item: any) => {
            console.log(item);
            this.attendanceInfo.push(item);
          });
          console.log(this.attendanceInfo);
          // Handle successful response here
          console.log(response.result);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      if (t_ID != null || undefined) {
        console.log(this.selectedOption);
        const formData = {
          teacher: this.hodRole == true ? t_ID : this.loginIUserId._id,
        };
        console.log(formData);
        this.attendanceInfo = [];
        this.http.post(endpoint, formData, httpOption).subscribe(
          (response: any) => {
            this.result = response.result;
            this.result.forEach((item: any) => {
              this.attendanceInfo.push(item);
            });
            console.log(this.attendanceInfo);
            // Handle successful response here
            console.log(response.result);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    }
  }

  getAttendanceDetail(attendanceId: any) {
    console.log(attendanceId);

    this.apiService.getAttendanceDetail(attendanceId).subscribe(
      (response: any) => {
        this.lessonName = response.attendance.lesson;
        this.topicName = response.attendance.topic;
        this.studentName = response.attendance.students;
        console.log(response.attendance.students);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getStudentsDetails() {
    const url = `http://localhost:5050/api/students/${this.loginIUserId._id}/details`;
    this.http.get(url, httpOption).subscribe(
      (response: any) => {
        this.name =
          response.student.firstName + ' ' + response.student.lastName;
        this.className = response.student.class.title;
        this.classYear = response.student.class.year;
        this.departmentName = response.student.department.name;
        this.studentAttendances = response.student.attendances;
        console.log(response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getSpecificStudentsDetailsFromParent(studentId: any) {
    const url = `http://localhost:5050/api/students/${studentId}/details`;
    this.http.get(url, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        this.name =
          response.student.firstName + ' ' + response.student.lastName;
        this.className = response.student.class.title;
        this.classYear = response.student.class.year;
        this.departmentName = response.student.department.name;
        this.studentAttendances = response.student.attendances;
        console.log(response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getSingleParent() {
    console.log(this.loginIUserId._id);
    const url = `http://localhost:5050/api/parents/${this.loginIUserId._id}/details`;
    this.http.get(url, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        this.myStudents = response.parent.students;
        console.log(this.myStudents);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
