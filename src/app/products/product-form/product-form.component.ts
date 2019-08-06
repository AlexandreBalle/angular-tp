import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('[0-9.]*') ]]
    });
  }

  onSaveProduct() {
    const name = this.productForm.get('name').value;
    const price = this.productForm.get('price').value;
    this.productsService.products.push({name, price});
    this.router.navigate(['/products']);
  }
}
