import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-add-editar-product',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-editar-product.component.html',
  styleUrl: './add-editar-product.component.css'
})
export class AddEditarProductComponent {
form: FormGroup;
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
this.form = this.fb.group({
  name: ['', Validators.required],
  description: ['', Validators.required],
  price: [null, Validators.required],
  stock: [null, Validators.required]
});
  }
addProduct() {
   const product: product = {
    name: this.form.value.name,
    description: this.form.value.description,
    price: this.form.value.price,
    stock: this.form.value.stock
 };
}

}