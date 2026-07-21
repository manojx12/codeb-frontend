import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Brand {

//   private baseUrl = 'http://localhost:8080/api/brands';
private baseUrl = `${environment.apiUrl}/brands`;
  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getBrandById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createBrand(brand: any): Observable<any> {
    return this.http.post(this.baseUrl, brand);
  }

  updateBrand(id: number, brand: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, brand);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
