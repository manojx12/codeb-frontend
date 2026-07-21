import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Payment {

//   private baseUrl = 'http://localhost:8080/api/payments';
private baseUrl = `${environment.apiUrl}/payments`;
  constructor(private http: HttpClient) { }

  getAllPayments(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getPaymentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPayment(payment: any): Observable<any> {
    return this.http.post(this.baseUrl, payment);
  }

  updatePayment(id: number, payment: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, payment);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
