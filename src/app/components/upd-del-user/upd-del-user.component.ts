import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/user.service';
import { user } from '../../interfaces/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upd-del-user',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './upd-del-user.component.html',
  styleUrl: './upd-del-user.component.css'
})
export class UpdDelUserComponent implements OnInit {
  id: number;
  userData: user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID recibido:', this.id); // Debug log
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    if (!this.id) {
      this.toastr.error('ID de usuario no válido', 'Error');
      return;
    }

    this.userService.getUser(this.id).subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // Debug log
        if (data) {
          this.userData = data;
        } else {
          this.toastr.error('No se encontraron datos del usuario', 'Error');
        }
      },
      error: (error) => {
        console.error('Error completo:', error); // Debug log
        this.toastr.error('Error al cargar los datos del usuario', 'Error');
      }
    });
  }

  updateUser() {
    console.log('Datos a actualizar:', this.userData); // Debug log
    
    if (!this.userData.username || !this.userData.email) {
      this.toastr.error('Los campos username y email son requeridos', 'Error');
      return;
    }

    this.userService.updateUser(this.id, this.userData).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado correctamente', 'Éxito');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al actualizar:', error); // Debug log
        this.toastr.error('Error al actualizar el usuario', 'Error');
      }
    });
  }
}