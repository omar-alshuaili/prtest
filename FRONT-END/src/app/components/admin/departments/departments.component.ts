import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments.service';
import Swal from 'sweetalert2';
import { Department, CreateDepartmentFormData, UpdateDepartmentFormData } from '../../../intefaces/department';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css'],
})
export class DepartmentsComponent implements OnInit {
  constructor(public apiService: DepartmentsService) {
  }

  data: Department[] = [];
  depName: string | null = '';
  updepName: string | null = '';

  ngOnInit(): void {
    this.getDepartments();
  }
  updatedId: string = '';

  getDepartments() {
    this.apiService.getDepartments().subscribe(
      (res: any) => {
        console.log(res);
        this.data = res.allDepartments;
      },
      (error) => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }

  createDepartment() {
    const formData: CreateDepartmentFormData = {
      name: this.depName?.toUpperCase() || '',
    };
    this.apiService.createDepartment(formData).subscribe(
      (res: any) => {
        if (res.messageType === 'success') {
          this.getDepartments();
          this.depName = null;
          console.log(res);
        }
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
    this.apiService.update().subscribe(
      (response: any) => {
        let upData: Department[] = response.allDepartments;

        upData.forEach((e: Department) => {
          if (e._id === id) {
            this.updepName = e.name;
          }
        });
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
        this.apiService.remove(id).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Deleted!',
              text: response.message,
              icon: 'success',
            });
            this.getDepartments();
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    });
  }

  updateDepartment() {
    const dataUpdated: UpdateDepartmentFormData = {
      name: this.updepName?.toUpperCase() || '',
    };
    let updatedId = this.updatedId;
    this.apiService.updateDepartment(updatedId, dataUpdated).subscribe(
      (response: any) => {
        if (response.messageType === 'success') {
          this.getDepartments();
          console.log(response);
          this.getDepartments();
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
}
