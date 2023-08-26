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
export class ParentsService {

  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

  createParent(formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/parents/create`,
      formData,
      httpOption
    );
  }

  getParents(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/parents`, httpOption);
  }

  getSingleParent(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.endPoint}/parents/${id}/details`,
      httpOption
    );
  }

  updateForParent(): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/parents`, httpOption);
  }

  updateParent(updatedId: any, dataUpdated: any): Observable<any> {
    return this.http.put<any>(
      `${this.endPoint}/parents/${updatedId}`,
      dataUpdated,
      httpOption
    );
  }

  removeForParent(id: any): Observable<any> {
    return this.http.patch<any>(
      `${this.endPoint}/parents/${id}`,
      null,
      httpOption
    );
  }

  addStudenttoParent(parentId: any, dataUpdated: any): Observable<any> {
    return this.http.put<any>(
      `${this.endPoint}/parents/${parentId}/add-student`,
      dataUpdated,
      httpOption
    );
  }
}
