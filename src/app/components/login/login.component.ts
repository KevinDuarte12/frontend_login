import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { user } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, SpinnerComponent, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {
  loading: boolean = false;
  userData = {
    username: '',
    password: ''
  };

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    private errorService: ErrorService
  ) { }

  onSubmit() {
    if (this.userData.password === '' || this.userData.username === '') {
      this.toastr.error('Todos los campos son requeridos', 'Error!', {
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
    this.userService.login(user).subscribe({
      next: (response: any) => {
        const token = response.token; // Extraer el token del objeto
        localStorage.setItem('token', token); // Guardar solo el token
        this.router.navigate(['/dashboard']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.errorService.msjError(e);
      }
    });
  }

}