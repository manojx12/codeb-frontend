import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Group {

//   private baseUrl = 'http://localhost:8080/api/groups';
private baseUrl = `${environment.apiUrl}/groups`;
  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getGroupById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createGroup(group: any): Observable<any> {
    return this.http.post(this.baseUrl, group);
  }

  updateGroup(id: number, group: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, group);
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
