import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService) { }
  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      this.toastr.error(e.error.msg, 'Error'); // Muestra el mensaje de error del backend
    } else {
      this.toastr.error('Error en el servidor', 'Error'); // Mensaje genérico si no hay "msg"
    }
  }
}
