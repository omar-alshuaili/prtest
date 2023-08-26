import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

const endpoint = 'http://localhost:5050/api/subjects';
let token = localStorage.getItem('token');

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
};

@Component({
  selector: 'app-teacher-subjects',
  templateUrl: './teacher-subjects.component.html',
  styleUrls: ['./teacher-subjects.component.css']
})
export class TeacherSubjectsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  data: any = [];
  subjects: any = [];
  title: any;
  code: any;
  email: any;
  pwd: any;
  class: any
  upTitle: any;
  upCode: any;
  depName: any;
  updep: any
  selectedOption: any;

  ngOnInit(): void {
    this.getDepartments();
    this.getSubjects();
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

  createSubject() {
    const endpoints = 'http://localhost:5050/api/subjects/create';

    const formData = {
      title: this.title,
      code: this.code.toUpperCase(),
      department: this.selectedOption,
    };

    console.log(formData);

    this.http.post(endpoints, formData, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        if (response.messageType === 'success') {
          this.getSubjects();
          console.log(response);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getSubjects() {
    const url = 'http://localhost:5050/api/subjects';
    this.http.get(url, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        this.subjects = response.allSubjects;
        console.log(this.subjects);
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
        let upSubjects;
        upSubjects = response.allSubjects;

        upSubjects.forEach((e: any) => {
          if (e._id === id) {
            console.log(e._id, id);
            this.upTitle = e.title;
            this.upCode = e.code;
            this.updep = e.department;
          }
        });
      },
      (error) => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }

  updateSubject() {
    const endpoints = `http://localhost:5050/api/subjects/${this.updatedId}`;

    const studentUpdated = {
      title: this.upTitle,
      code: this.upCode,
    };

    this.http.put(endpoints, studentUpdated, httpOption).subscribe(
      (response: any) => {
        // if (response.messageType === 'success') {
        // this.getDepartments();
        console.log(response);
        this.getSubjects();
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
        const endpoints = `http://localhost:5050/api/subjects/${id}`;
        this.http.patch(endpoints, null, httpOption).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Student has been deleted.',
              icon: 'success',
            });
            this.getSubjects();
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    });
  }

}
