import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Estimate {

  private baseUrl = 'http://localhost:8080/api/estimates';

  constructor(private http: HttpClient) { }

  getAllEstimates(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getEstimateById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createEstimate(estimate: any): Observable<any> {
    return this.http.post(this.baseUrl, estimate);
  }

  updateEstimate(id: number, estimate: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, estimate);
  }

  deleteEstimate(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
