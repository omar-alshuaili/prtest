import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { CreateExamService } from 'src/app/services/create-exam.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { Department, Subject, Class, Teacher, FormData } from '../../../intefaces/create-exam';
import Swal from 'sweetalert2';

let token = localStorage.getItem('token');

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.css']
})
export class CreateExamComponent implements OnInit {
  loginIUserId: any;
  selectedTermOption: string = '';
  selectedTotalMarksOption: string = '';
  selectedPassingMarksOption: string = '';
  selectedDepOption: string = '';
  selectedTeacherOption: string = '';
  selectedClassOption: string = '';
  selectedSubjectOption: string = '';
  selectedDateOption: string = '';
  selectedMonthOption: string = '';
  selectedYearOption: string = '';
  AllClasses: Class[] = [];
  AllSubjects: Subject[] = [];
  allStudents: any = [];
  presentStudents: any[] = [];
  presentData: any;
  teacherinfo: any = [];
  subjects: Subject[] = [];
  classes: Class[] = [];
  teachers: Teacher[] = [];
  data: Department[] = [];

  date: string[] = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
    '30', '31'
  ];

  month: string[] = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER',
    'OCTUBER', 'NOVEMBER', 'DECEMBER'
  ];

  term: string[] = ['First Term', 'Mid Term', 'Final'];
  singleClassStudnets: any[] = [];
  allSingleStudnetId: any[] = [];

  constructor(
    public apiService: CreateExamService,
    public departmentService: DepartmentsService,
    public classService: ClassesService,
    public teacherService: TeachersService,
    public subjectService: SubjectsService
  ) { }

  ngOnInit(): void {
    this.getSubjects();
    this.getClasses();
    this.getTeachers();
    this.getDepartments();
  }

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      (response: any) => {
        console.log(response);
        this.data = response.allDepartments;
        console.log(this.data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe(
      (response: any) => {
        console.log(response);
        this.subjects = response.allSubjects;
        console.log(this.subjects);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getClasses() {
    this.classService.getClasses().subscribe(
      (response: any) => {
        console.log(response);
        this.classes = response.classes;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getTeachers() {
    this.teacherService.getTeachers().subscribe(
      (response: any) => {
        console.log(response);
        this.teachers = response.teachers;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getVal() {
    this.allSingleStudnetId = [];
    console.log({ title: this.selectedTermOption });
    console.log({ title: this.selectedClassOption });
    this.classDetails();
  }

  classDetails() {
    this.classService.classDetails(this.selectedClassOption).subscribe(
      (response: any) => {
        console.log(response);
        this.singleClassStudnets = response.class.students;
        this.singleClassStudnets.forEach((student: any) => {
          this.allSingleStudnetId.push({ student: student._id });
        });
        console.log(this.singleClassStudnets);
        console.log(this.allSingleStudnetId);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  creteExam() {
    const formData: FormData = {
      title: this.selectedTermOption,
      totalPercentage: this.selectedTotalMarksOption,
      passingPercentage: this.selectedPassingMarksOption,
      teacher: this.selectedTeacherOption,
      class: this.selectedClassOption,
      department: this.selectedDepOption,
      subject: this.selectedSubjectOption,
      students: this.allSingleStudnetId,
      day: this.selectedDateOption,
      month: this.selectedMonthOption,
      year: this.selectedYearOption
    };
    console.log(formData);
    this.apiService.creteExam(formData).subscribe(
      (response: any) => {
        console.log(response);
        if (response.messageType === 'success') {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
          });
          this.selectedTermOption = '',
          this.selectedTotalMarksOption = '',
          this.selectedPassingMarksOption = '',
          this.selectedTeacherOption = '',
          this.selectedClassOption = '',
          this.selectedDepOption = '',
          this.selectedSubjectOption = '',
          this.allSingleStudnetId = [],
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

  getStudentId() {
    const classId = {
      class: this.selectedClassOption
    };
  }
}
