import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent {
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(data => {
      console.log(data);
    });
  }
}
