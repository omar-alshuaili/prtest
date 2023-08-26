import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let token = localStorage.getItem('token');

const endpoint = 'http://localhost:5050/api/students/filtered';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
};

@Component({
  selector: 'app-teacher-attendance',
  templateUrl: './teacher-attendance.component.html',
  styleUrls: ['./teacher-attendance.component.css'],
})
export class TeacherAttendanceComponent implements OnInit {
  loginIUserId: any;
  selectedClassOption: any;
  AllClasses: any = [];
  AllSubjects: any = [];
  allStudents: any = [];
  presentStudents: any[] = [];
  presentData: any;
  teacherinfo: any = [];
  students: any[] = [];

  date: any = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];
  lesson: any = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  month: any = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTUBER',
    'NOVEMBER',
    'DECEMBER',
  ];
  year: any = ['2018', '2019', '2020', '2021', '2022', '2023'];
  topics: any = [
    'Angular',
    'Python',
    'Modules',
    'Social Media',
    'Buisiness Development',
    'Data Analysis',
  ];

  selectedTopicOption: any = '';
  selectedYearOption: any = '';
  selectedMonthOption: any = '';
  selectedDateOption: any = '';
  selectedLessonOption: any = '';
  constructor(private http: HttpClient) {
    this.loginIUserId = JSON.parse(localStorage.getItem('userId') as any);
    console.log('userId', this.loginIUserId._id);
  }

  ngOnInit(): void {
    this.getSpecificTeacher();
  }

  getSpecificTeacher() {
    const url = `http://localhost:5050/api/teachers/${this.loginIUserId._id}/details`;
    this.http.get(url, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        this.teacherinfo = response.teacher;
        this.AllClasses = response.teacher.info;
        this.AllClasses.forEach((classes: any) => {
          console.log(classes.class);
          this.AllClasses = classes.class;
          this.AllSubjects = classes.subject;
        });
        // this.AllClasses = response.teacher.info.forEach((classes: any) => {
        //   console.log(classes.class);
        //   this.AllClasses = classes.class.title;
        //   console.log(this.AllClasses);
        // });
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }

  getClassID() {
    console.log(this.selectedClassOption);
    if (
      this.selectedClassOption != null ||
      this.selectedClassOption != undefined
    ) {
      const formData = {
        class: this.selectedClassOption,
      };
      console.log(formData);
      this.http.post(endpoint, formData, httpOption).subscribe(
        (response: any) => {
          // Handle successful response here
          this.allStudents = response.allStudents;
        },
        (error) => {
          console.error('Error:', error);
          // Handle error here
        }
      );
    }
  }
  onCheckboxChange(event: any, student: any) {
    if (event.target.checked) {
      this.presentStudents.push(student);
      console.log(this.presentStudents);
      this.students.push({ student: student._id, isPresent: true });
      console.log(this.students);
    } else {
      const index = this.presentStudents.indexOf(student);
      const indexx = this.students.indexOf(student);
      if (index !== -1) {
        this.presentStudents.splice(index, 1);
        this.students.splice(index, 1);
        console.log(this.presentStudents);
        console.log(this.students);
      }
    }
    this.createAttendance(event);
  }

  createAttendance(evnt: any) {
    console.log(this.teacherinfo);
    let cdtn = false;
    if (evnt.target.checked) {
      cdtn = true;
    }
    // const endpoints = 'http://localhost:5050/api/attendance/create';
    // this.presentStudents.forEach((ps: any) => {
    //   console.log(ps._id);

    const formData = {
      lesson: this.selectedLessonOption,
      topic: this.selectedTopicOption,
      department: this.teacherinfo.department._id,
      class: this.AllClasses._id,
      teacher: this.loginIUserId._id,
      subject: this.AllSubjects._id,
      day: this.selectedDateOption,
      month: this.selectedMonthOption,
      year: this.selectedYearOption,
      // students: [
      //   { student: this.stdID, isPresent: cdtn == true ? true : cdtn }
      // ],
      students: this.students,
    };
    console.log(formData);
    // });
    // console.log(this.presentStudents);

    // const formData = {
    //   lesson: "1",
    //   topic: "What is Algebra?",
    //   department: "64104f4ebd6fb4c053490a42",
    //   class: "641e92822f3daa3ac15c8809",
    //   teacher: "6421707231a9461a0863564a",
    //   subject: "6412aed45ee654ee1224e7a1",
    //   day: 7,
    //   month: "MARCH",
    //   year: 2023,
    //   students: [
    //       {"student": "642147567cd6520708cd25f0",
    //       "isPresent": true}
    //   ]
    // };

    // console.log(formData);

    // this.http.post(endpoints, formData, httpOption).subscribe(
    //   (response: any) => {
    //     console.log(response);
    //     if (response.messageType === 'success') {
    //       console.log(response);
    //     }
    //   },
    //   (error) => {
    //     console.error('Error:', error);
    //   }
    // );
  }
}
