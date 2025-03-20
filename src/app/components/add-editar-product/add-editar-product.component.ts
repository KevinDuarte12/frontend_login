import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-editar-product',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './add-editar-product.component.html',
  styleUrl: './add-editar-product.component.css',
})
export class AddEditarProductComponent implements OnInit {
  form: FormGroup;
  isEditMode = false; // Para saber si estamos en modo edición
  productId: number | null = null; // Almacena el ID del producto si estamos editando

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
      price: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Verifica si hay un ID en la URL (modo edición)
    this.productId = this.aRoute.snapshot.params['id'];
    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.form.patchValue(data); // Rellena el formulario con los datos del producto
      },
      error: (err) => {
        this.toastr.error('Error al cargar el producto', 'Error');
        this.router.navigate(['/dashboard']);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.warning('Por favor, complete el formulario correctamente', 'Advertencia');
      return;
    }

    const product: product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock,
    };

    if (this.isEditMode && this.productId) {
      // Modo edición
      this.productService.updateProduct(this.productId, product).subscribe({
        next: () => {
          this.toastr.success('Producto actualizado correctamente', 'Éxito');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.toastr.error('Error al actualizar el producto', 'Error');
        },
      });
    } else {
      // Modo creación
      this.productService.createProduct(product).subscribe({
        next: () => {
          this.toastr.success('Producto creado correctamente', 'Éxito');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.toastr.error('Error al crear el producto', 'Error');
        },
      });
    }
  }
}