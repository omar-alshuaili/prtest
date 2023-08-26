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
export class StudentsService {
  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

  createStudent(formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/students/create`,
      formData,
      httpOption
    );
  }

  getStudents(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/students`, httpOption);
  }

  updateForStudent(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/students`, httpOption);
  }

  updateStudent(updatedId: any, dataUpdated: any): Observable<any> {
    return this.http.put<any>(
      `${this.endPoint}/students/${updatedId}`,
      dataUpdated,
      httpOption
    );
  }

  removeForStudent(id: any): Observable<any> {
    return this.http.patch<any>(
      `${this.endPoint}/students/${id}`,
      null,
      httpOption
    );
  }
}
