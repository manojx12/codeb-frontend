import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Chain {

  private baseUrl = 'http://localhost:8080/api/chains';

  constructor(private http: HttpClient) { }

  getAllChains(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getChainById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createChain(chain: any): Observable<any> {
    return this.http.post(this.baseUrl, chain);
  }

  updateChain(id: number, chain: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, chain);
  }

  deleteChain(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
