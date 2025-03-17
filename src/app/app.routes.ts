import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUserComponent } from './components/registrar-user/registrar-user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrarUserComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path:'**', redirectTo: 'login'}
];
