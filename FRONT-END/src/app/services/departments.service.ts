import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  token : any = localStorage.getItem('token');
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  }
    
  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

    getDepartments(): Observable<any> {
      return this.http.get<any>(`${this.endPoint}/departments`, this.httpOption);
    }
  
    createDepartment(formData: any): Observable<any> {
      return this.http.post<any>(
        `${this.endPoint}/departments/create`,
        formData,
        this.httpOption
      );
    }
  
    update(): Observable<any> {
      return this.http.get<any>(`${this.endPoint}/departments`, this.httpOption);
    }
  
    updateDepartment(updatedId: any, dataUpdated: any): Observable<any> {
      return this.http.put<any>(
        `${this.endPoint}/departments/${updatedId}`,
        dataUpdated,
        this.httpOption
      );
    }
  
    remove(id: any): Observable<any> {
      return this.http.patch<any>(
        `${this.endPoint}/departments/${id}`,
        null,
        this.httpOption
      );
    }

}
