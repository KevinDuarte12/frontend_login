import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

   private myAppUrl: string;
    private myApiUrl: string;
  
    constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint; // Asegúrate de que 'endpoint' esté definido en environment
      this.myApiUrl = 'api/product';
    }
    getProducts(): Observable<product[]> {
      const token = localStorage.getItem('token');
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<product[]>(`${this.myAppUrl}${this.myApiUrl}`,{headers: header});
    }
}
