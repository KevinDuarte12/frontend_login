import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment'; // Asegúrate de que la ruta sea correcta
import { user } from '../interfaces/user';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root' // Asegúrate de que el servicio esté proporcionado en 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint; // Asegúrate de que 'endpoint' esté definido en environment
    this.myApiUrl = 'api/users/';
  }

  signIn(user: user): Observable<any> {
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);
        return throwError(() => new Error('Error al registrar el usuario'));
      })
    );
  }
}