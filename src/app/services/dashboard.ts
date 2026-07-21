import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Dashboard {

//   private baseUrl = 'http://localhost:8080/api/dashboard';
private baseUrl = `${environment.apiUrl}/dashboard`;
  constructor(private http: HttpClient) { }

  getSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/summary`);
  }
}
