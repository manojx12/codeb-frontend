import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Payroll {

//   private baseUrl = 'http://localhost:8080/api/payrolls';
private baseUrl = `${environment.apiUrl}/payrolls`;
  constructor(private http: HttpClient) { }

  getAllPayrolls(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getPayrollById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPayroll(payroll: any): Observable<any> {
    return this.http.post(this.baseUrl, payroll);
  }

  updatePayroll(id: number, payroll: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, payroll);
  }

  deletePayroll(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
