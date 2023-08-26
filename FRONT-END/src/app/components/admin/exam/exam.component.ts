import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { ExamsService } from 'src/app/services/exams.service';
import { ParentsService } from 'src/app/services/parents.service';
import Swal from 'sweetalert2';
import { Exam, Student } from '../../../intefaces/exam';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css'],
})
export class ExamComponent implements OnInit {
  teacherExams: Exam[] = [];
  loginIUserId: any;
  examsClassDetails: string =  '';
  examsSubjectDetails: string =  '';
  examsTeacherDetails: string =  '';
  examsDepartmentDetails: string =  '';
  examsStudentsDetails: Student[] = [];
  examGlobalId: any;
  selectedObtainMarks: any[] = [];
  studentRole: boolean;
  selectedClassOption: any;
  departmentName: any;
  classYear: any;
  className: any;
  name: any;
  hodRole: boolean;
  teacherRole: boolean;
  classId: any;
  studentAttendances: any[] = [];
  classes: any[] = [];
  myStudents: any[] = [];
  parentRole: boolean;

  constructor(
    public apiService: ExamsService,
    public parentService: ParentsService,
    public classService: ClassesService
  ) {
    this.loginIUserId = JSON.parse(localStorage.getItem('userId') as any);
    this.studentRole =
      this.loginIUserId.role === 'STUDENT' || this.loginIUserId.role === 'PARENT';
    this.hodRole =
      this.loginIUserId.role === 'HOD' || this.loginIUserId.role === 'ADMIN';
    this.parentRole = this.loginIUserId.role === 'PARENT';
    this.teacherRole = this.loginIUserId.role === 'TEACHER';
  }

  ngOnInit(): void {
    this.getExams(this.classId);
    this.getStudentsDetails();
    this.getClasses();
    this.getSingleParent();
  }

  getClassID(): void {
    this.classId = this.selectedClassOption;
    this.getExams(this.classId);
  }

  getExams(cId: any): void {
    if (this.loginIUserId.role === 'TEACHER') {
      const formData = {
        teacher: this.loginIUserId._id,
      };
      this.apiService.getFilteredExams(formData).subscribe(
        (response: any) => {
          this.teacherExams = response.exams;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else if (
      this.loginIUserId.role === 'ADMIN' ||
      this.loginIUserId.role === 'HOD'
    ) {
      if (cId != null || undefined) {
        const formData = {
          class: this.selectedClassOption,
        };
        this.apiService.getFilteredExams(formData).subscribe(
          (response: any) => {
            this.teacherExams = response.exams;
            console.log(this.teacherExams);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    }
  }

  examDetails(examId: any): void {
    this.examGlobalId = examId;
    console.log(this.examGlobalId, examId);
    this.apiService.examDetails(this.examGlobalId).subscribe(
      (response: any) => {
        console.log(response.exam.students);
        this.examsClassDetails = response.exam.class.title;
        this.examsSubjectDetails = response.exam.subject.title;
        this.examsTeacherDetails =
          response.exam.teacher.firstName +
          ' ' +
          response.exam.teacher.lastName;
        this.examsDepartmentDetails = response.exam.department.name;
        this.examsStudentsDetails = response.exam.students;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  upDateExamsMarks(): void {
    const students = [];

    for (let i = 0; i < this.examsStudentsDetails.length; i++) {
      const examStudent = this.examsStudentsDetails[i];
      const obtainedMarks = this.selectedObtainMarks[i];
      const student = {
        student: examStudent.student._id,
        obtainedPercentage: obtainedMarks,
      };
      students.push(student);
    }
    console.log(students);
    this.apiService.upDateExamsMarks(this.examGlobalId, { students }).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          console.log(response);
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
          });
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getStudentsDetails(): void {
    this.apiService.getStudentsDetails(this.loginIUserId._id).subscribe(
      (response: any) => {
        this.name = response.student.firstName + ' ' + response.student.lastName;
        this.className = response.student.class.title;
        this.classYear = response.student.class.year;
        this.departmentName = response.student.department.name;
        this.studentAttendances = response.student.exams;
        console.log(response);
        console.log(this.studentAttendances);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getStudentsDetailsForParent(id:any): void {
    this.apiService.getStudentsDetails(id).subscribe(
      (response: any) => {
        this.name = response.student.firstName + ' ' + response.student.lastName;
        this.className = response.student.class.title;
        this.classYear = response.student.class.year;
        this.departmentName = response.student.department.name;
        this.studentAttendances = response.student.exams;
        console.log(response);
        console.log(this.studentAttendances);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getClasses(): void {
    this.classService.getClasses().subscribe(
      (response: any) => {
        this.classes = response.classes;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getFilteredExams(): void {
    // Rest of the method...
  }

  getSingleParent(): void {
    console.log(this.loginIUserId._id);
    this.parentService.getSingleParent(this.loginIUserId._id).subscribe(
      (response: any) => {
        console.log(response);
        this.myStudents = response.parent.students;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  // addExamResult(examId: any, studentId: any, result: any): void {
  //   this.apiService.addExamResult(examId, studentId, result).subscribe(
  //     (response: any) => {
  //       if (response.messageType === 'success') {
  //         console.log(response);
  //         Swal.fire({
  //           title: 'Success!',
  //           text: response.message,
  //           icon: 'success',
  //         });
  //       }
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
  
}
