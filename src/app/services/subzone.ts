import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Subzone {

  private baseUrl = 'http://localhost:8080/api/subzones';

  constructor(private http: HttpClient) { }

  getAllSubzones(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getSubzoneById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSubzone(subzone: any): Observable<any> {
    return this.http.post(this.baseUrl, subzone);
  }

  updateSubzone(id: number, subzone: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, subzone);
  }

  deleteSubzone(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
