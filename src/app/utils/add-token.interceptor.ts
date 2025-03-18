import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clona la solicitud y agrega un header de autorización
    const authReq = req.clone({
      setHeaders: { Authorization: 'Bearer tu-token-aqui' }
    });

    // Envía la solicitud modificada
    return next.handle(authReq);
  }
}     