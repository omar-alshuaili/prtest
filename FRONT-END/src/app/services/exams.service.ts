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
export class ExamsService {

  endPoint = 'http://localhost:5050/api';

  constructor(private http: HttpClient) {}

  getFilteredExams(formData: any): Observable<any> {
    return this.http.post<any>(
      `${this.endPoint}/exams/filtered`,
      formData,
      httpOption
    );
  }

  examDetails(id:any): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/exams/${id}/details`, httpOption);
  }

  upDateExamsMarks(id: any, {students}: any): Observable<any> {
    return this.http.put<any>(
      `${this.endPoint}/exams/${id}`,
      {students},
      httpOption
    );
  }

  getStudentsDetails(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.endPoint}/students/${id}/details`,
      httpOption
    );
  }
  // addExamResult(examId: any, studentId: any, result: any): Observable<any> {
  //   return this.http.post<any>(
  //     `${this.endPoint}/add-result/${examId}/${studentId}`,
  //     { result },
  //     httpOption
  //   );
  // }
  
}
