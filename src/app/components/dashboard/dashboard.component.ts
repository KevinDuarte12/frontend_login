import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { user } from '../../interfaces/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  products: product[] = [];
  user: user[] = [];
  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getUsers();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => {
        this.toastr.error('Error al cargar los productos', 'Error');
      },
    });
  }

  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product.id !== id);
          this.toastr.success('Producto eliminado correctamente', 'Éxito');
        },
        error: (err) => {
          this.toastr.error('Error al eliminar el producto', 'Error');
        },
      });
    }
  }
  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => (this.user = data),
      error: (err) => {
        this.toastr.error('Error al cargar los usuarios', 'Error');
      },
    });
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.user = this.user.filter((user) => user.id !== id);
          this.toastr.success('Usuario eliminado correctamente', 'Éxito');
        },
        error: (err) => {
          this.toastr.error('Error al eliminar el usuario', 'Error');
        },
      });
    }
  }

  updateUser(id: number, userData: user): void {
    this.userService.updateUser(id, userData).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado correctamente', 'Éxito');
        this.getUsers(); // Recargar la lista después de actualizar
      },
      error: (err) => {
        this.toastr.error('Error al actualizar el usuario', 'Error');
      },
    });
  }
}