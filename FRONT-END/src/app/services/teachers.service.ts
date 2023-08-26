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
export class TeachersService {
  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

  getTeachers(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/teachers`, httpOption);
  }

  getSpecificTeacher(id:any): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/teachers/${id}/details`, httpOption);
  }

  createTeacher(formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/teachers/create`,
      formData,
      httpOption
    );
  }

  updateForTeacher(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/teachers`, httpOption);
  }

  updateTeachers(updatedId: any, dataUpdated: any): Observable<any> {
    return this.http.put<any>(
      `${this.endPoint}/teachers/${updatedId}`,
      dataUpdated,
      httpOption
    );
  }

  removeForTeacher(id: any): Observable<any> {
    return this.http.patch<any>(
      `${this.endPoint}/teachers/${id}`,
      null,
      httpOption
    );
  }
}
