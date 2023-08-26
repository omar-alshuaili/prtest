import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments.service';
import { HodService } from 'src/app/services/hod.service';
import Swal from 'sweetalert2';
import { Hod, CreateHodFormData, UpdateHodFormData } from '../../../intefaces/hod';

let token = localStorage.getItem('token');

@Component({
  selector: 'app-hods',
  templateUrl: './hods.component.html',
  styleUrls: ['./hods.component.css'],
})
export class HodsComponent implements OnInit {
  constructor(
    public apiService: HodService,
    public departmentService: DepartmentsService
  ) {}

  data: any = [];
  hods: Hod[] = [];
  firstName: string | null = '';
  lastName: string | null = '';
  email: string | null = '';
  pwd: string | null = '';
  upFirstName: string | null = '';
  upLastName: string | null = '';
  upEmail: string | null = '';
  depName: string | null = '';
  selectedOption: any = '';
  ngOnInit(): void {
    this.getDepartments();
    this.getHODS();
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

  getHODS() {
    this.apiService.getHODS().subscribe(
      (response: any) => {
        console.log(response);
        this.hods = response.allHODs;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  createHod() {
    const formData: CreateHodFormData = {
      firstName: this.firstName?.toUpperCase() || '',
      lastName: this.lastName?.toUpperCase() || '',
      email: this.email || '',
      password: this.pwd || '',
      department: this.selectedOption || '',
    };

    this.apiService.createHod(formData).subscribe(
      (response: any) => {
        console.log(response);
        if (response.messageType === 'success') {
          this.getHODS();
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

  updateForHod(id: any) {
    this.updatedId = id;

    this.apiService.updateForHod().subscribe(
      (response: any) => {
        let upHODs: Hod[] = response.allHODs;
        upHODs.forEach((e: Hod) => {
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

  updateHODs() {
    const hodUpdated: UpdateHodFormData = {
      firstName: this.upFirstName || '',
      lastName: this.upLastName || '',
      email: this.upEmail || '',
    };

    let updatedId = this.updatedId;

    this.apiService.updateHod(updatedId, hodUpdated).subscribe(
      (response: any) => {
        console.log(response);
        if (response.messageType === 'success') {
          this.getHODS();
          Swal.fire({
            title: 'Success!',
            text: 'Updates saved successfully.',
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

  removeForHod(id: any) {
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
        this.apiService.removeForHod(id).subscribe(
          (response: any) => {
            if (response.messageType === 'success') {
              Swal.fire({
                title: 'Deleted!',
                text: response.message,
                icon: 'success',
              });
              this.getHODS();
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
