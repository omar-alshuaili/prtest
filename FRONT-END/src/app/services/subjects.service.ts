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
export class SubjectsService {
  
  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

  createSubject(formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/subjects/create`,
      formData,
      httpOption
    );
  }

  getSubjects(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/subjects`, httpOption);
  }

  updateForSubject(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/subjects`, httpOption);
  }

  updateSubject(updatedId: any, dataUpdated: any): Observable<any> {
    return this.http.put<any>(
      `${this.endPoint}/subjects/${updatedId}`,
      dataUpdated,
      httpOption
    );
  }

  removeForSubject(id: any): Observable<any> {
    return this.http.patch<any>(
      `${this.endPoint}/subjects/${id}`,
      null,
      httpOption
    );
  }
}
