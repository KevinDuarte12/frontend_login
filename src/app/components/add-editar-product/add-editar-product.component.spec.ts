import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditarProductComponent } from './add-editar-product.component';

describe('AddEditarProductComponent', () => {
  let component: AddEditarProductComponent;
  let fixture: ComponentFixture<AddEditarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditarProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
