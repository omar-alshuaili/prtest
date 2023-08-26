import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

const endpoint = 'http://localhost:5050/api/teachers';
let token = localStorage.getItem('token');

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
};

@Component({
  selector: 'app-hod-teachers',
  templateUrl: './hod-teachers.component.html',
  styleUrls: ['./hod-teachers.component.css']
})
export class HodTeachersComponent implements OnInit {

  constructor(private http: HttpClient) {}

  data: any = [];
  teachers: any = [];
  firstName: any;
  lastName: any;
  email: any;
  pwd: any;
  upFirstName: any;
  upLastName: any;
  upEmail: any;
  depName: any;
  selectedOption: any;
  ngOnInit(): void {
    this.getDepartments();
    this.getTeachers();
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

  getTeachers() {
    const url = 'http://localhost:5050/api/teachers';
    this.http.get(url, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        this.teachers = response.teachers;
        // console.log(this.teachers);
      },
      (error) => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }

  createTeacher() {
    const endpoints = 'http://localhost:5050/api/teachers/create';

    const formData = {
      firstName: this.firstName.toUpperCase(),
      lastName: this.lastName.toUpperCase(),
      email: this.email,
      password: this.pwd,
      department: this.selectedOption,
    };

    console.log(formData);

    this.http.post(endpoints, formData, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        if (response.messageType === 'success') {
          console.log(response);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  update(id: any) {
    console.log(id);
    this.updatedId = id;
    this.http.get(endpoint, httpOption).subscribe(
      (response: any) => {
        let upteachers;
        upteachers = response.teachers;

        upteachers.forEach((e: any) => {
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

  updateTeachers() {
    const endpoints = `http://localhost:5050/api/teachers/${this.updatedId}`;

    const teacherUpdated = {
      firstName: this.upFirstName,
      lastName: this.upLastName,
      email: this.upEmail,
    };

    this.http.put(endpoints, teacherUpdated, httpOption).subscribe(
      (response: any) => {
        // if (response.messageType === 'success') {
        // this.getDepartments();
        console.log(response);
        this.getTeachers();
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
      text: 'You will not be able to recover this department!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        const endpoints = `http://localhost:5050/api/teachers/${id}`;
        this.http.patch(endpoints, null, httpOption).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Department has been deleted.',
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
