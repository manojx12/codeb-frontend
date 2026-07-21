import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Client {

  private baseUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  // list of all client
  getAllClients(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  //  specific client (ID ) to get
  getClientById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // New client create
  createClient(client: any): Observable<any> {
    return this.http.post(this.baseUrl, client);
  }

  // Existing client update
  updateClient(id: number, client: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, client);
  }

  // Client delete
  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
