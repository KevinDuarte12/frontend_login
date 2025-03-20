import { Routes } from '@angular/router'; // Importa Routes para definir las rutas de la aplicación
import { LoginComponent } from './components/login/login.component'; // Importa el componente LoginComponent
import { RegistrarUserComponent } from './components/registrar-user/registrar-user.component'; // Importa el componente RegistrarUserComponent
import { DashboardComponent } from './components/dashboard/dashboard.component'; // Importa el componente DashboardComponent
import { authGuard } from './utils/auth.guard'; // Importa el guardia de autenticación
import { AddEditarProductComponent } from './components/add-editar-product/add-editar-product.component'; // Importa el componente AddEditarProductComponent
export const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el componente de inicio de sesión
  { path: 'register', component: RegistrarUserComponent }, // Ruta para el componente de registro de usuarios
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, // Ruta para el dashboard, protegida por el guardia de autenticación
  { path: 'add', component: AddEditarProductComponent }, // Ruta para crear
  { path: 'edit/:id', component: AddEditarProductComponent }, // Ruta para editar
  { path: '**', redirectTo: 'login' } // Ruta comodín: redirige cualquier ruta no definida a 'login'
];