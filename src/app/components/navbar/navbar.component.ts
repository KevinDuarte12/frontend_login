import { Component } from '@angular/core'; // Importa el decorador Component para definir un componente
import { Router } from '@angular/router'; // Importa Router para manejar la navegación

@Component({
  selector: 'app-navbar', // Selector del componente (se usa en las plantillas HTML)
  imports: [], // Lista de componentes y directivas que se usan en este componente (vacío en este caso)
  templateUrl: './navbar.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrl: './navbar.component.css' // Ruta al archivo de estilos CSS del componente
})
export class NavbarComponent {
  constructor(private router: Router) {} // Inyecta el servicio Router para manejar la navegación

  logOut() {
    // Método para cerrar sesión
    localStorage.removeItem('token'); // Elimina el token del localStorage
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }
}