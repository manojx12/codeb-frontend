import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Leave {

//   private baseUrl = 'http://localhost:8080/api/leaves';
private baseUrl = `${environment.apiUrl}/leaves`;
  constructor(private http: HttpClient) { }

  getAllLeaves(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getLeaveById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createLeave(leave: any): Observable<any> {
    return this.http.post(this.baseUrl, leave);
  }

  updateLeave(id: number, leave: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, leave);
  }

  deleteLeave(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
