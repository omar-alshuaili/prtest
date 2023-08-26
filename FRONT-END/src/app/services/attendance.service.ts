import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  token : any = localStorage.getItem('token');
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  }
  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

  getAttendances(formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/attendances/filtered`,
      formData,
      this.httpOption
    );
  }

  getAttendanceDetail(id: any): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/attendances/${id}`, this.httpOption);
  }

  getSpecificStudentsDetailsFromParent(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.endPoint}/students/${id}/details`,
      this.httpOption
    );
  }

}
