import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';


const endpoint = 'http://localhost:5050/api/verify-otp';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  qrcode: any = '';
  otpCode: any;
  loginIUserId: any;
  userLoggedIn: any;
  sucssesAlert = false;
  valid = '';
  showAlert = false;
  invalid = '';
  httpOtions:any;
  token: any = localStorage.getItem('token');


  constructor(
    private route: Router,
    private http: HttpClient
  ) {
    this.qrcode = localStorage.getItem('qrCode');
    this.loginIUserId = JSON.parse(localStorage.getItem('userId') as any);
    console.log(this.qrcode);
  }

  ngOnInit(): void {
    this.httpOtions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
    }
    this.otpCheck();
  }

  otpCheck() {

    if (this.otpCode != null || undefined) {
      const otp = {
        otp: this.otpCode
      }

      
      this.http.post(endpoint, otp, this.httpOtions).subscribe(
        (response: any) => {
          // Handle successful response here
          localStorage.setItem('qrCode', response.QRCode)
          localStorage.setItem('isAuthenticated', response.isAuthenticated)
          console.log(response);

          if (response.messageType === 'success' && response.isAuthenticated) {
            console.log(response);
            this.userLoggedIn = jwt_decode(response.token);
            localStorage.setItem("userId", JSON.stringify(this.userLoggedIn.user));
            console.log(this.userLoggedIn.user.role);
            
            if (this.userLoggedIn.user.role === 'ADMIN') {
              this.route.navigate(['/dashboard']); // Navigate to admin route on successful login
            } else if (this.userLoggedIn.user.role === 'PARENT') {
              this.route.navigate(['/dashboard']); // Navigate to principal route on successful login
            } else if (this.userLoggedIn.user.role === 'HOD') {
              this.route.navigate(['/dashboard']); // Navigate to HOD route on successful login
            } else if (this.userLoggedIn.user.role === 'TEACHER') {
              this.route.navigate(['/dashboard']); // Navigate to teacher route on successful login
            } else if (this.userLoggedIn.user.role === 'STUDENT') {
              this.route.navigate(['/dashboard']); // Navigate to student route on successful login
            }
            this.sucssesAlert = true;
            this.valid = response.message;
            console.log(this.sucssesAlert);
            console.log(response.messageType);
            localStorage.setItem('msg', this.valid);
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
  }

}
