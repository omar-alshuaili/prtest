import { Component, OnInit } from '@angular/core';
import { ParentsService } from 'src/app/services/parents.service';
import { StudentsService } from 'src/app/services/students.service';
import Swal from 'sweetalert2';
import { Parent, CreateParentFormData, UpdateParentFormData } from '../../../intefaces/parent';

let token = localStorage.getItem('token');

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css'],
})
export class ParentsComponent implements OnInit {
  constructor(
    public apiService: ParentsService,
    public studentService: StudentsService
  ) {
    this.getParents();
  }

  data: any = [];
  students: any = [];
  parents: Parent[] = [];
  firstName: string | null = '';
  lastName: string | null = '';
  email: string | null = '';
  pwd: string | null = '';
  class: any;
  upFirstName: string | null = '';
  upLastName: string | null = '';
  upEmail: string | null = '';
  selectedOption: any;
  selectedStudenttoParent: any;
  setSelectedStudenttoParent: any;
  parentGlobalId: any;

  ngOnInit(): void {
    this.getStudents();
  }
  updatedId: string = '';

  getStudents() {
    this.studentService.getStudents().subscribe(
      (response: any) => {
        this.students = response.allStudents;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  createParent() {
    const formData: CreateParentFormData = {
      firstName: this.firstName || '',
      lastName: this.lastName || '',
      email: this.email || '',
      password: this.pwd || '',
    };

    this.apiService.createParent(formData).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          this.getParents();
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getParents() {
    this.apiService.getParents().subscribe(
      (response: any) => {
        this.parents = response.parents;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateForParent(id: any) {
    this.updatedId = id;
    this.apiService.updateForParent().subscribe(
      (response: any) => {
        let upParents: Parent[] = response.parents;

        upParents.forEach((e: Parent) => {
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

  updateParent() {
    let updatedId = this.updatedId;

    const parentUpdated: UpdateParentFormData = {
      firstName: this.upFirstName || '',
      lastName: this.upLastName || '',
      email: this.upEmail || '',
    };

    this.apiService.updateParent(updatedId, parentUpdated).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          this.getParents();
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

  removeForParent(id: any) {
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
        this.apiService.removeForParent(id).subscribe(
          (response: any) => {
            if (response.messageType === 'success') {
              Swal.fire({
                title: 'Deleted!',
                text: response.message,
                icon: 'success',
              });
              this.getParents();
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    });
  }

  getStudentId() {
    this.setSelectedStudenttoParent = this.selectedStudenttoParent;
  }

  addStudent(parentId: any) {
    this.parentGlobalId = parentId;
  }

  addStudenttoParent() {
    let parentGlobalId = this.parentGlobalId;

    const formData = {
      studentId: this.setSelectedStudenttoParent,
    };

    this.apiService.addStudenttoParent(parentGlobalId, formData).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          Swal.fire({
            title: 'Add Student to the Parent!',
            text: 'Student has been added.',
            icon: 'success',
          });
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
