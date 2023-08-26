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
export class HodService {
  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

    getHODS(): Observable<any> {
      return this.http.get<any>(`${this.endPoint}/hods`, httpOption);
    }
  
    createHod(formData: any): Observable<any> {
      return this.http.post<any>(
        `${this.endPoint}/hods/create`,
        formData,
        httpOption
      );
    }
  
    updateForHod(): Observable<any> {
      return this.http.get<any>(`${this.endPoint}/hods`, httpOption);
    }
  
    updateHod(updatedId: any, dataUpdated: any): Observable<any> {
      return this.http.put<any>(
        `${this.endPoint}/hods/${updatedId}`,
        dataUpdated,
        httpOption
      );
    }
  
    removeForHod(id: any): Observable<any> {
      return this.http.patch<any>(
        `${this.endPoint}/hods/${id}`,
        null,
        httpOption
      );
    }
}
