import { Component } from '@angular/core'; // Importa el decorador Component para definir un componente
import { FormsModule } from '@angular/forms'; // Importa FormsModule para manejar formularios
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService para mostrar notificaciones
import { UserService } from '../../services/user.service'; // Importa el servicio UserService para manejar la lógica de usuarios
import { user } from '../../interfaces/user'; // Importa la interfaz user
import { Router, RouterLink } from '@angular/router'; // Importa Router y RouterLink para manejar la navegación y enlaces
import { HttpErrorResponse } from '@angular/common/http'; // Importa HttpErrorResponse para manejar errores HTTP

import { SpinnerComponent } from '../../shared/spinner/spinner.component'; // Importa el componente Spinner
import { NgIf } from '@angular/common'; // Importa la directiva NgIf para usar *ngIf en la plantilla
import { ErrorService } from '../../services/error.service'; // Importa el servicio ErrorService para manejar errores

@Component({
  selector: 'app-registrar-user', // Selector del componente (se usa en las plantillas HTML)
  standalone: true, // Indica que este componente es independiente (standalone)
  imports: [FormsModule, RouterLink, SpinnerComponent, NgIf], // Componentes y directivas que se usan en este componente
  templateUrl: './registrar-user.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrl: './registrar-user.component.css' // Ruta al archivo de estilos CSS del componente
})
export class RegistrarUserComponent {
  loading: boolean = false; // Variable para controlar el estado de carga (muestra/oculta el spinner)
  userData = {
    username: '', // Variable para almacenar el nombre de usuario
    password: '', // Variable para almacenar la contraseña
    confirmPassword: '', // Variable para almacenar la confirmación de la contraseña
    email: '' // Variable para almacenar el correo electrónico
  };

  constructor(
    private toastr: ToastrService, // Inyecta el servicio ToastrService para mostrar notificaciones
    private userService: UserService, // Inyecta el servicio UserService para manejar la lógica de usuarios
    private router: Router, // Inyecta el servicio Router para manejar la navegación
    private errorService: ErrorService // Inyecta el servicio ErrorService para manejar errores
  ) { }

  onSubmit() {
    // Método que se ejecuta cuando se envía el formulario
    if (this.userData.password === '' || this.userData.username === '' || this.userData.confirmPassword === '') {
      // Verifica si los campos están vacíos
      this.toastr.error('Todos los campos son requeridos', 'Error!', {
        timeOut: 3000, // Duración de la notificación (3 segundos)
        progressBar: true // Muestra una barra de progreso en la notificación
      });
      return; // Detiene la ejecución si los campos están vacíos
    }

    if (this.userData.password !== this.userData.confirmPassword) {
      // Verifica si las contraseñas coinciden
      this.toastr.error('Las contraseñas no coinciden', 'Error!', {
        timeOut: 3000, // Duración de la notificación (3 segundos)
        progressBar: true // Muestra una barra de progreso en la notificación
      });
      return; // Detiene la ejecución si las contraseñas no coinciden
    }

    // Crea un objeto user con los datos del formulario
    const user: user = {
      username: this.userData.username,
      password: this.userData.password,
      email: this.userData.email
    };

    this.loading = true; // Activa el estado de carga (muestra el spinner)

    // Llama al método signIn del servicio UserService para registrar al usuario
    this.userService.signIn(user).subscribe({
      next: (data) => {
        // Maneja la respuesta exitosa del servidor
        this.loading = false; // Desactiva el estado de carga (oculta el spinner)
        this.toastr.success(`Usuario ${user.username} registrado correctamente`, 'Éxito!'); // Muestra un mensaje de éxito
        this.router.navigate(['/login']); // Redirige al usuario a la página de login
      },
      error: (e: HttpErrorResponse) => {
        // Maneja los errores de la solicitud
        this.loading = false; // Desactiva el estado de carga (oculta el spinner)
        this.errorService.msjError(e); // Muestra un mensaje de error usando el servicio ErrorService
      }
    });
  }
}