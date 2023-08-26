import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { StudentsService } from 'src/app/services/students.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';
import {
  Department,
  Student,
  Class,
  Teacher,
  Subject,
  ClassInfo,
  ApiResponse,
} from '../../../intefaces/class';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit {
  constructor(
    public apiService: ClassesService,
    public departmentService: DepartmentsService,
    public studentsService: StudentsService,
    public teachersService: TeachersService,
    public subjectsService: SubjectsService
  ) {
    this.getStudents();
    this.getClassesByDepsAndYears();
  }

  detailedClassId: any;
  deletedStudentArray: any = [];
  data: any = [];
  classes: Class[] = [];
  teachers: Teacher[] = [];
  subjects: Subject[] = [];
  createdClasses: Class[] = [];
  selectedClassId: string = '';
  students: Student[] = [];
  studentsId: any = [];
  addedStudentsId: any = '';
  filteredStudents: any = [];
  singleClassStudnets: Student[] = [];
  singleClassTeacherAndSubject: ClassInfo[] = [];
  singleClass: string = '';
  singleClassYear: any;
  singleClassInfo: ClassInfo[] = [];
  singleClassTeacher: string = '';
  singleClassSubject: string = '';
  singleClassDepartment: string = '';
  selectedTeacherId: any;
  selectedSubjectId: any;
  selectedStudents: string[] = [];
  title: any;
  className: any;
  section: any;
  year: any;
  filterYear: any;
  email: any;
  pwd: any;
  upTitle: any;
  upYear: any;
  upEmail: any;
  depName: any;
  selectedOption: any;
  selectedClassOption: any;
  selectedStudentOption: any;
  isChecked: any;
  filteredDep: any;
  ngOnInit(): void {
    this.getDepartments();
    this.getClasses();
    // this.isChecked = new Array(this.students.length).fill(false);
    this.getClassesByDepsAndYears();
    this.getTeachers();
    this.getSubjects();
    this.classDetails(this.classId);
    this.addTeacherAndSubjectToClass();
  }
  updatedId: string = '';
  classId: string = '';

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      (response: ApiResponse) => {
        this.data = response.allDepartments;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getStudents() {
    this.studentsService.getStudents().subscribe(
      (response: any) => {
        this.students = response.allStudents;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  createClass() {
    const addStudents = {
      student: this.selectedStudentOption,
    };

    console.log(addStudents);
    this.title = this.className + this.section;
    const formData = {
      title: this.title.toUpperCase(),
      year: this.year,
      department: this.selectedOption,
    };

    this.apiService.createClass(formData).subscribe(
      (response: ApiResponse) => {
        if (response.messageType === 'success') {
          this.getClasses();
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
          });
          this.className = null;
          this.section = null;
          this.year = null;
          this.selectedOption = null;
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getClasses() {
    this.apiService.getClasses().subscribe(
      (response: any) => {
        this.classes = response.classes;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateForClass(id: any) {
    this.updatedId = id;
    this.apiService.updateForClass().subscribe(
      (response: any) => {
        let upClasses;
        upClasses = response.classes;

        upClasses.forEach((e: Class) => {
          if (e._id === id) {
            this.upTitle = e.title;
            this.upYear = e.year;
          }
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateClasses() {
    const classUpdated = {
      title: this.upTitle,
      year: this.upYear,
    };

    this.apiService.updateClasses(this.updatedId, classUpdated).subscribe(
      (response: ApiResponse) => {
        if (response.messageType === 'success') {
          this.getClasses();
          Swal.fire({
            title: 'Success!',
            text: 'Updates saved successfully.',
            icon: 'success',
          });
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  removeClass(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this class!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.removeClass(id).subscribe(
          (response: ApiResponse) => {
            if (response.messageType === 'success') {
              Swal.fire({
                title: 'Deleted!',
                text: response.message,
                icon: 'success',
              });
              this.getClasses();
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    });
  }
  getClassesByDepsAndYears() {
    const deps = {
      department: this.filteredDep,
      year: this.filterYear,
    };
    const depps = deps.department == '' ? null : deps;
    this.apiService.getClassesByDepsAndYears(depps).subscribe(
      (response: any) => {
        this.createdClasses = response.classes;
        this.filteredStudents = response.students;
        this.studentsId = response.students._id;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  addStudentToClass() {
    const addStudents = {
      students: this.selectedStudents,
    };

    this.apiService.addStudentToClass(this.selectedClassId, addStudents).subscribe(
      (response: ApiResponse) => {
        if (response.messageType === 'success') {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
          });
          this.getClasses();
          this.selectedStudents = [];
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getTeachers() {
    this.teachersService.getTeachers().subscribe(
      (response: any) => {
        this.teachers = response.teachers;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getSubjects() {
    this.subjectsService.getSubjects().subscribe(
      (response: any) => {
        this.subjects = response.allSubjects;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  addTeacherAndSubjectToClass() {
    const addTeacherAndSubjets = {
      teacher: this.selectedTeacherId,
      subject: this.selectedSubjectId,
    };
    this.apiService.addTeacherAndSubjectToClass(this.selectedClassId, addTeacherAndSubjets).subscribe(
      (response: ApiResponse) => {
        console.log(response);
        if (response.messageType === 'success') {
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

  filter(e: any) {
    this.filteredDep = e.target.value;
    this.getClassesByDepsAndYears();
    console.log(e.target.value);
  }

  filterYearr(e: any) {
    this.filterYear = e.target.value;
    this.getClassesByDepsAndYears();
    console.log(e.target.value);
  }

  updateSelectedStudents(event: any, student: any) {
    console.log(student);
    if (event.target.checked) {
      // console.log('checked', event.target.checked);

      this.selectedStudents.push(student._id);
      console.log(this.selectedStudents);
    } else {
      // console.log('checked', event.target.checked);
      const index = this.selectedStudents.indexOf(student._id);
      if (index !== -1) {
        this.selectedStudents.splice(index, 1);
        console.log(this.selectedStudents);
      }
    }
  }

  classDetails(classId: any) {
    this.detailedClassId = classId;
    this.apiService.classDetails(classId).subscribe(
      (response: any) => {
        this.singleClassStudnets = response.class.students;
        this.singleClassTeacherAndSubject = response.class.info;
        this.singleClass = response.class.title;
        this.singleClassYear = response.class.year;
        this.singleClassDepartment = response.class.department.name;
        this.singleClassInfo = response.class.info;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // removeStudentfromClass(classId: any, studentId: any) {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this student from the class!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, remove it!',
  //     cancelButtonText: 'Cancel',
  //     confirmButtonColor: '#dc3545',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.apiService.removeStudentfromClass(classId, studentId).subscribe(
  //         (response: ApiResponse) => {
  //           if (response.messageType === 'success') {
  //             Swal.fire({
  //               title: 'Removed!',
  //               text: response.message,
  //               icon: 'success',
  //             });
  //             this.getClasses();
  //           }
  //         },
  //         (error: any) => {
  //           console.error('Error:', error);
  //         }
  //       );
  //     }
  //   });
  // }

  removeStudentfromClass(id:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this class!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = {
            students: [id]
        }
        
        this.apiService.removeStudentfromClass(this.detailedClassId, formData).subscribe(
          (response: any) => {
            if(response.messageType === "success"){
              this.classDetails(this.detailedClassId);
              Swal.fire({
                title: 'Deleted!',
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
    });
  }

  removeInfofromClass(id:any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this class!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = {
            infoId: id
        }
        this.apiService.removeInfofromClass(this.detailedClassId, formData).subscribe(
          (response: any) => {
            if(response.messageType === "success"){
              this.classDetails(this.detailedClassId)
              Swal.fire({
                title: 'Deleted!',
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
    });
  }
}
