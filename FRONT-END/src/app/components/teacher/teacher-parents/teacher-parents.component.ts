import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

const endpoint = 'http://localhost:5050/api/parents';
let token = localStorage.getItem('token');

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
};

@Component({
  selector: 'app-teacher-parents',
  templateUrl: './teacher-parents.component.html',
  styleUrls: ['./teacher-parents.component.css']
})
export class TeacherParentsComponent implements OnInit {
  constructor(private http: HttpClient) {console.log("I'm cnnstructor Function");this.getParents();}

  data: any = [];
  // students: any = [];
  parents: any = [];
  firstName: any;
  lastName: any;
  email: any;
  pwd: any;
  class: any;
  upFirstName: any;
  upLastName: any;
  upEmail: any;
  selectedOption: any;
  ngOnInit(): void {
    console.log("I'm Init Function");
    // this.getStudents();
    // this.getParents();
  }
  updatedId: string = '';

  // getStudents() {
  //   const url = 'http://localhost:5050/api/students';
  //   this.http.get(url, httpOption).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       this.students = response.allStudents;
  //       console.log(this.students);
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //       // Handle error here
  //     }
  //   );
  // }

  createParent() {
    const endpoints = 'http://localhost:5050/api/parents/create';

    const formData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.pwd,
    };

    console.log(formData);

    this.http.post(endpoints, formData, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        if (response.messageType === 'success') {
          this.getParents();
          console.log(response);
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getParents() {
    const url = 'http://localhost:5050/api/parents';
    this.http.get(url, httpOption).subscribe(
      (response: any) => {
        console.log(response);
        this.parents = response.parents;
        console.log(this.parents);
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
        let upParents;
        upParents = response.parents;

        upParents.forEach((e: any) => {
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

  updateParent() {
    const endpoints = `http://localhost:5050/api/parents/${this.updatedId}`;

    const parentUpdated = {
      firstName: this.upFirstName,
      lastName: this.upLastName,
      email: this.upEmail,
    };

    this.http.put(endpoints, parentUpdated, httpOption).subscribe(
      (response: any) => {
        // if (response.messageType === 'success') {
        console.log(response);
        // this.getStudents();
        this.getParents();
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
      text: 'You will not be able to recover this Parent!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        const endpoints = `http://localhost:5050/api/parents/${id}`;
        this.http.patch(endpoints, null, httpOption).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Deleted!',
              text: 'Parent has been deleted.',
              icon: 'success',
            });
            // this.getStudents();
            this.getParents();
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    });
  }

  addStudent(parentId: any) {
    console.log(parentId);
  }
}
