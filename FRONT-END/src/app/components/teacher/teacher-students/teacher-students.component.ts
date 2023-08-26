import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

const endpoint = 'http://localhost:5050/api/students';
let token = localStorage.getItem('token');

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
};

@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html',
  styleUrls: ['./teacher-students.component.css']
})
export class TeacherStudentsComponent implements OnInit {

  constructor(private http: HttpClient) {}

  data: any = [];
  students: any = [];
  firstName: any;
  lastName: any;
  email: any;
  pwd: any;
  class: any
  upFirstName: any;
  upLastName: any;
  upEmail: any;
  depName: any;
  selectedOption: any;
  ngOnInit(): void {
    this.getDepartments();
    this.getStudents();
  }
  updatedId: string = '';

  getDepartments() {
    const endpoints = 'http://localhost:5050/api/departments';
    this.http.get(endpoints, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        this.data = response.allDepartments;
        console.log(this.data);
      },
      (error) => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }



  createStudent() {
    const endpoints = 'http://localhost:5050/api/students/create';

    const formData = {
      firstName: this.firstName.toUpperCase(),
      lastName: this.lastName.toUpperCase(),
      email: this.email,
      password: this.pwd,
      class: this.class,
      department: this.selectedOption,
    };

    console.log(formData);

    this.http.post(endpoints, formData, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        if (response.messageType === 'success') {
          this.getStudents();
          console.log(response);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getStudents() {
    const url = 'http://localhost:5050/api/students';
    this.http.get(url, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        this.students = response.allStudents;
        console.log(this.students);
      },
      (error) => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }

  update(id: any) {
    console.log(id);
    this.updatedId = id;
    this.http.get(endpoint, httpOption).subscribe(
      (response: any) => {
        let upStudents;
        upStudents = response.allStudents;

        upStudents.forEach((e: any) => {
          if (e._id === id) {
            console.log(e._id, id);
            this.upFirstName = e.firstName;
            this.upLastName = e.lastName;
            this.upEmail = e.email;
          }
        });
      },
      (error) => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }

  updateStudent() {
    const endpoints = `http://localhost:5050/api/students/${this.updatedId}`;

    const studentUpdated = {
      firstName: this.upFirstName,
      lastName: this.upLastName,
      email: this.upEmail,
    };

    this.http.put(endpoints, studentUpdated, httpOption).subscribe(
      (response: any) => {
        // if (response.messageType === 'success') {
        // this.getDepartments();
        console.log(response);
        this.getStudents();
        Swal.fire({
          title: 'Success!',
          text: 'Updates saved successfully.',
          icon: 'success',
        });
        // }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  remove(id: any) {
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
        const endpoints = `http://localhost:5050/api/students/${id}`;
        this.http.patch(endpoints, null, httpOption).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Student has been deleted.',
              icon: 'success',
            });
            this.getStudents();
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    });
  }

}
