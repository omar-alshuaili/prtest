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
export class ClassesService {

  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

  createClass(formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/classes/create`,
      formData,
      httpOption
    );
  }

  getClasses(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/classes`, httpOption);
  }

  updateForClass(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/classes`, httpOption);
  }

  updateClasses(updatedId: any, dataUpdated: any): Observable<any> {
    return this.http.put<any>(
      `${this.endPoint}/classes/${updatedId}`,
      dataUpdated,
      httpOption
    );
  }

  removeClass(id: any): Observable<any> {
    return this.http.patch<any>(
      `${this.endPoint}/classes/${id}`,
      null,
      httpOption
    );
  }

  getClassesByDepsAndYears(depps: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/classes/filtered`,
      depps,
      httpOption
    );
  }

  addStudentToClass(id: any , addStudents: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/classes/${id}/add-students`,
      addStudents,
      httpOption
    );
  }

  addTeacherAndSubjectToClass(id: any , addTeacherAndSubjets: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/classes/${id}/add-info`,
      addTeacherAndSubjets,
      httpOption
    );
  }
  
  classDetails(id:any): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/classes/${id}/details`, httpOption);
  }

  removeStudentfromClass(id: any, formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/classes/${id}/remove-students`,
      formData,
      httpOption
    );
  }

  removeInfofromClass(id: any, formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/classes/${id}/remove-info`,
      formData,
      httpOption
    );
  }
}
