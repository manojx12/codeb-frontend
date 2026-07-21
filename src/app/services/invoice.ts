import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Invoice {

//   private baseUrl = 'http://localhost:8080/api/invoices';
private baseUrl = `${environment.apiUrl}/invoices`;
  constructor(private http: HttpClient) { }

  getAllInvoices(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getInvoiceById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createInvoice(invoice: any): Observable<any> {
    return this.http.post(this.baseUrl, invoice);
  }

  updateInvoice(id: number, invoice: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
