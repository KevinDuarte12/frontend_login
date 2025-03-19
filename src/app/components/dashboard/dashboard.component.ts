import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component'; // Importa el componente Navbar
import { ProductService } from '../../services/product.service'; // Importa el servicio ProductService
import { product } from '../../interfaces/product'; // Importa la interfaz product
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard', // Selector del componente
  imports: [NavbarComponent, RouterLink], // Componentes y directivas que se usan en este componente
  templateUrl: './dashboard.component.html', // Ruta al archivo de plantilla HTML
  styleUrl: './dashboard.component.css', // Ruta al archivo de estilos CSS
  standalone: true // Indica que este componente es independiente (standalone)
})
export class DashboardComponent {
  constructor(private productService: ProductService) { } // Inyecta el servicio ProductService

  products: product[] = []; // Arreglo para almacenar los productos

  ngOnInit() {
    // Método que se ejecuta cuando el componente se inicializa
    this.getProducts(); // Llama al método para obtener los productos
  }

  getProducts() {
    // Método para obtener los productos desde el servicio
    this.productService.getProducts().subscribe(data => {
      // Suscribe a la respuesta del servicio
      this.products = data; // Asigna los datos obtenidos al arreglo products
    });
  }
}