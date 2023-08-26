import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

let token = localStorage.getItem('token');
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CreateExamService {

  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

  creteExam(formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/exams/create`,
      formData,
      httpOption
    );
  }
  
}
