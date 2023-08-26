import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments.service';
import { StudentsService } from 'src/app/services/students.service';
import Swal from 'sweetalert2';
import { Student, CreateStudentFormData, UpdateStudentFormData } from '../../../intefaces/student';

let token = localStorage.getItem('token');

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  constructor(
    public apiService: StudentsService,
    public departmentService: DepartmentsService,
  ) {}

  data: any = [];
  students: Student[] = [];
  firstName: string | null = '';
  lastName: string | null = '';
  email: string | null = '';
  pwd: string | null = '';
  upFirstName: string | null = '';
  upLastName: string | null = '';
  upEmail: string | null = '';
  depName: string | null = '';
  selectedOption: any;
  ngOnInit(): void {
    this.getDepartments();
    this.getStudents();
  }
  updatedId: string = '';

  getDepartments() {
    this.departmentService.getDepartments().subscribe(
      (response: any) => {
        this.data = response.allDepartments;
      },
      (error) => {
        console.error('Error:', error);
      }
    )
  }

  createStudent() {
    const formData: CreateStudentFormData = {
      firstName: this.firstName?.toUpperCase() || '',
      lastName: this.lastName?.toUpperCase() || '',
      email: this.email || '',
      password: this.pwd || '',
      department: this.selectedOption || '',
    };

    this.apiService.createStudent(formData).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          this.getStudents();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.pwd = '';
    this.upFirstName = '';
    this.upLastName = '';
    this.upEmail = '';
    this.depName = '';
    this.selectedOption = '';
  }

  getStudents() {
    this.apiService.getStudents().subscribe(
      (response: any) => {
        this.students = response.allStudents;
      },
      (error) => {
        console.error('Error:', error);
      }
    )
  }

  updateForStudent(id: any) {
    this.updatedId = id;

    this.apiService.getStudents().subscribe(
      (response: any) => {
        let upStudents: Student[] = response.allStudents;

        upStudents.forEach((e: Student) => {
          if (e._id === id) {
            this.upFirstName = e.firstName;
            this.upLastName = e.lastName;
            this.upEmail = e.email;
          }
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateStudent() {
    const studentUpdated: UpdateStudentFormData = {
      firstName: this.upFirstName || '',
      lastName: this.upLastName || '',
      email: this.upEmail || '',
    };

    let updatedId = this.updatedId;

    this.apiService.updateStudent(updatedId, studentUpdated).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          console.log(response);
          this.getStudents();
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
          });
        } else {
          Swal.fire({
            title: 'Fail!',
            text: response.message,
            icon: 'error',
          });
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  removeForStudent(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this student!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.removeForStudent(id).subscribe(
          (response: any) => {
            if (response.messageType === 'success') {
              Swal.fire({
                title: 'Deleted!',
                text: response.message,
                icon: 'success',
              });
              this.getStudents();
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        )
      }
    });
  }
}
