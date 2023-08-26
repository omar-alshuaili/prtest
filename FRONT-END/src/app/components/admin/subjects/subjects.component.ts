import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import Swal from 'sweetalert2';
import { Subject, CreateSubjectFormData, UpdateSubjectFormData } from '../../../intefaces/subject';

let token = localStorage.getItem('token');

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor(
    public apiService: SubjectsService,
    public departmentService: DepartmentsService,
  ) { }

  data: any = [];
  subjects: Subject[] = [];
  title: string | null = '';
  code: string | null = '';
  email: string | null = '';
  pwd: string | null = '';
  class: any;
  upTitle: string | null = '';
  upCode: string | null = '';
  depName: string | null = '';
  updep: any;
  selectedOption: any;

  ngOnInit(): void {
    this.getDepartments();
    this.getSubjects();
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

  createSubject() {
    const formData: CreateSubjectFormData = {
      title: this.title || '',
      code: this.code?.toUpperCase() || '',
      department: this.selectedOption || '',
    };

    this.apiService.createSubject(formData).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          this.getSubjects();
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

  getSubjects() {
    this.apiService.getSubjects().subscribe(
      (response: any) => {
        this.subjects = response.allSubjects;
      },
      (error) => {
        console.error('Error:', error);
      }
    )
  }

  updateForSubject(id: any) {
    this.updatedId = id;
    this.apiService.updateForSubject().subscribe(
      (response: any) => {
        let upSubjects: Subject[] = response.allSubjects;

        upSubjects.forEach((e: Subject) => {
          if (e._id === id) {
            this.upTitle = e.title;
            this.upCode = e.code;
            this.updep = e.department;
          }
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  updateSubject() {
    const subjectUpdated: UpdateSubjectFormData = {
      title: this.upTitle || '',
      code: this.upCode || '',
    };

    let updatedId = this.updatedId;

    this.apiService.updateSubject(updatedId, subjectUpdated).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          this.getSubjects();
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

  removeForSubject(id: any) {
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
        this.apiService.removeForSubject(id).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Deleted!',
              text: response.message,
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
