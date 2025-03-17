import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { user } from '../../interfaces/user';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-registrar-user',
  standalone: true,
  imports: [FormsModule, RouterLink, NavbarComponent, SpinnerComponent, NgIf],
  templateUrl: './registrar-user.component.html',
  styleUrl: './registrar-user.component.css'
})
export class RegistrarUserComponent {
  loading: boolean = false;
  userData = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.userData.password === '' || this.userData.username === '' || this.userData.confirmPassword === '') {
      this.toastr.error('Todos los campos son requeridos', 'Error!', {
        timeOut: 3000,
        progressBar: true
      });
      return;
    }

    if (this.userData.password !== this.userData.confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error!', {
        timeOut: 3000,
        progressBar: true
      });
      return;
    }

    const user: user = {
      username: this.userData.username,
      password: this.userData.password
    };

    this.loading = true;

    this.userService.signIn(user).subscribe({
      next: (data) => {
        this.loading = false;
        this.toastr.success(`Usuario ${user.username} registrado correctamente`, 'Éxito!');
        this.router.navigate(['/login']);
      },
      error: (event: HttpErrorResponse) => {
        this.loading = false;
        if (event.error?.message) {
          const errorMessage = event.error?.message || 'Error al registrar el usuario';
          this.toastr.error(errorMessage, 'Error!');
        } else {
          this.toastr.error('Upss ocurrió un error, comuníquese con el administrador', '¡Error!');
        }
      }
    });
  }
}