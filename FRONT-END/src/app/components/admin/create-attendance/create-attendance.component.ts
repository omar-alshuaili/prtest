import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateAttendanceService } from 'src/app/services/create-attendance.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { Class, TeacherInfo, Student, FormData } from '../../../intefaces/create-attendance';
import Swal from 'sweetalert2';

let token = localStorage.getItem('token');

const endpoint = 'http://localhost:5050/api/students/filtered';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
};

@Component({
  selector: 'app-create-attendance',
  templateUrl: './create-attendance.component.html',
  styleUrls: ['./create-attendance.component.css']
})
export class CreateAttendanceComponent implements OnInit {
  loginIUserId: any;
  selectedClassOption: any;
  AllClasses: any = [];
  AllSubjects: any = [];
  allStudents: Student[] = [];
  presentStudents: Student[] = [];
  presentData: any;
  teacherinfo: TeacherInfo = { department: { _id: '' } };
  students: { student: string; isPresent: boolean }[] = [];
  ifEmpty: any;

  date: string[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14',
    '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26',
    '27', '28', '29', '30', '31',
  ];

  lesson: string[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
  ];

  month: string[] = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST',
    'SEPTEMBER', 'OCTUBER', 'NOVEMBER', 'DECEMBER'
  ];

  year: string[] = [
    '2018', '2019', '2020', '2021', '2022', '2023'
  ];

  topics: string[] = [
    'Angular', 'Python', 'Modules', 'Social Media',
    'Buisiness Development', 'Data Analysis'
  ];

  selectedTopicOption: string = '';
  selectedYearOption: string = '';
  selectedMonthOption: string = '';
  selectedDateOption: string = '';
  selectedLessonOption: string = '';

  constructor(
    private http: HttpClient,
    public apiService: CreateAttendanceService,
    public teacherService: TeachersService
  ) {
    this.loginIUserId = JSON.parse(localStorage.getItem('userId') as any);
    console.log('userId', this.loginIUserId._id);
  }

  ngOnInit(): void {
    this.getSpecificTeacher();
  }

  getSpecificTeacher() {
    this.teacherService.getSpecificTeacher(this.loginIUserId._id).subscribe(
      (response: any) => {
        this.teacherinfo = response.teacher;
        this.AllClasses = response.teacher.info;
        this.AllClasses.forEach((classes: any) => {
          this.AllClasses = classes.class;
          this.AllSubjects = classes.subject;
        });
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  getClassID() {
    console.log(this.selectedClassOption);
    if (
      this.selectedClassOption != null ||
      this.selectedClassOption != undefined
    ) {
      const formData: { class: Class } = {
        class: this.selectedClassOption,
      };
      this.http.post(endpoint, formData, httpOption).subscribe(
        (response: any) => {
          this.allStudents = response.allStudents;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  onCheckboxChange(event: any, student: Student) {
    if (event.target.checked) {
      this.presentStudents.push(student);
      console.log(this.presentStudents);
      this.students.push({ student: student._id, isPresent: true });
      console.log(this.students);
    } else {
      const index = this.presentStudents.indexOf(student);
      console.log(index);
      if (index !== -1) {
        this.presentStudents.splice(index, 1);
        this.students.splice(index, 1);
        console.log(this.presentStudents);
        console.log(this.students);
      }
    }
  }

  createAttendance() {
    const formData: FormData = {
      lesson: this.selectedLessonOption,
      topic: this.selectedTopicOption,
      department: this.teacherinfo.department._id,
      class: this.AllClasses._id,
      teacher: this.loginIUserId._id,
      subject: this.AllSubjects._id,
      day: this.selectedDateOption,
      month: this.selectedMonthOption,
      year: this.selectedYearOption,
      students: this.students,
    };
    console.log(formData);

    this.apiService.createAttendance(formData).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
          });

            this.selectedLessonOption = '',
            this.selectedTopicOption = '',
            this.teacherinfo.department._id = '',
            this.AllClasses._id = '',
            this.loginIUserId._id = '',
            this.AllSubjects._id = '',
            this.selectedDateOption = '',
            this.selectedMonthOption = '',
            this.selectedYearOption = '',
            console.log(response);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
