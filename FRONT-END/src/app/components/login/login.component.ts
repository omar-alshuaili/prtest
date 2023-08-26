import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

const endpoint = 'http://localhost:5050/api/auth/sign-in';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  selectedOption: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  sucssesAlert = false;
  valid = '';
  showAlert = false;
  invalid = '';


  onSubmit() {
    // handle form submission here

    console.log(this.selectedOption);

    const formData = {
      email: this.loginForm.get('email').value.toLowerCase(),
      password: this.loginForm.get('password').value,
      // role: this.selectedOption.toUpperCase(),
    };

    console.log(formData);
    this.http.post(endpoint, formData, httpOptions).subscribe(
      (response: any) => {
        // Handle successful response here
        // console.log(response);
        // if(response.isAuthenticated === false){
          //   this.route.navigate(['/verify']);
          //   console.log(response.isAuthenticated)
          // }
          
          
          if (response.messageType === 'success') {
          localStorage.setItem('qrCode', response.QRCode);
          localStorage.setItem('isAuthenticated', response.isAuthenticated);
          localStorage.setItem('token', response.token);
          console.log(response);
          if(response.isAuthenticated === false){
            this.route.navigate(['/verify']);
          }
          // let token: any = localStorage.getItem('token');
          // const decodedToken: any = jwt_decode(token);
          // const data = decodedToken.user;
          // // this.dataSent.emit(data);
          // console.log(data);
          // localStorage.setItem('userId', JSON.stringify(data));
          // console.log(response.isAuthenticated)
          // if (data.role === 'ADMIN') {
          //   this.route.navigate(['/dashboard']); // Navigate to admin route on successful login
          // } else if (data.role === 'PARENT') {
          //   this.route.navigate(['/dashboard']); // Navigate to principal route on successful login
          // } else if (data.role === 'HOD') {
          //   this.route.navigate(['/dashboard']); // Navigate to HOD route on successful login
          // } else if (data.role === 'TEACHER') {
          //   this.route.navigate(['/dashboard']); // Navigate to teacher route on successful login
          // } else if (data.role === 'STUDENT') {
          //   this.route.navigate(['/dashboard']); // Navigate to student route on successful login
          // }
          // this.sucssesAlert = true;
          // this.valid = response.message;
          // console.log(this.sucssesAlert);
          // console.log(response.messageType);
          // localStorage.setItem('msg', this.valid);
        } else {
          this.showAlert = true;
          this.invalid = response.message;
          console.log(this.invalid);
          // alert(invalid)
        }
      },
      (error) => {
        console.error('Error:', error);
        // Handle error here
      }
    );
  }

  closeToast(){
    this.showAlert = false;
  }
}
