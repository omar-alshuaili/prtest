import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments.service';
import { TeachersService } from 'src/app/services/teachers.service';
import Swal from 'sweetalert2';
import { Teacher, CreateTeacherFormData, UpdateTeacherFormData } from '../../../intefaces/teacher';

let token = localStorage.getItem('token');

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
    constructor(
        public apiService: TeachersService,
        public departmentService: DepartmentsService,
    ) {}

    data: any = [];
    teachers: Teacher[] = [];
    firstName: string | null = '';
    lastName: string | null = '';
    email: string | null = '';
    pwd: string | null = '';
    upFirstName: string | null = '';
    upLastName: string | null = '';
    upEmail: string | null = '';
    depName: any;
    selectedOption: any;
    ngOnInit(): void {
      this.getDepartments();
      this.getTeachers();
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
      );
    }

    getTeachers() {
      this.apiService.getTeachers().subscribe(
        (response: any) => {
          this.teachers = response.teachers;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

    createTeacher() {
      const formData: CreateTeacherFormData = {
        firstName: this.firstName || '',
        lastName: this.lastName || '',
        email: this.email || '',
        password: this.pwd || '',
        department: this.selectedOption || '',
      };

      this.apiService.createTeacher(formData).subscribe(
        (response: any) => {
          console.log(response);
          if (response.messageType === 'success') {
            this.getTeachers();
            this.firstName = null;
            this.lastName = null;
            this.email = null;
            this.selectedOption = null;
            this.pwd = null;
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }

    updateForTeacher(id: any) {
      this.updatedId = id;

      this.apiService.updateForTeacher().subscribe(
        (response: any) => {
          let upteachers: Teacher[] = response.teachers;
          upteachers.forEach((e: Teacher) => {
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

    updateTeachers() {
      const teacherUpdated: UpdateTeacherFormData = {
        firstName: this.upFirstName || '',
        lastName: this.upLastName || '',
        email: this.upEmail || '',
      };

      let updatedId = this.updatedId;

      this.apiService.updateTeachers(updatedId, teacherUpdated).subscribe(
        (response: any) => {
          if (response.messageType === 'success') {
            this.getTeachers();
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

    removeForTeacher(id: any) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this department!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#dc3545',
      }).then((result) => {
        if (result.isConfirmed) {
          this.apiService.removeForTeacher(id).subscribe(
            (response: any) => {
              Swal.fire({
                title: 'Deleted!',
                text: response.message,
                icon: 'success',
              });
              this.getTeachers();
            },
            (error) => {
              console.error('Error:', error);
            }
          );
        }
      });
    }
}
