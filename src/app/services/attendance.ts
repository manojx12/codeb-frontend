import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Attendance {

  private baseUrl = 'http://localhost:8080/api/attendance';

  constructor(private http: HttpClient) { }

  getAllAttendance(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getAttendanceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAttendance(attendance: any): Observable<any> {
    return this.http.post(this.baseUrl, attendance);
  }

  updateAttendance(id: number, attendance: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, attendance);
  }

  deleteAttendance(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
