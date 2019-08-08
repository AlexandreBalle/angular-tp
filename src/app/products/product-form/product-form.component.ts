import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

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
    this.productsService.addProduct(new Product(name, parseInt(price)))
                        .subscribe(
                          (product) => { console.log('Produit enregistrer :' + product) },
                          (err) => { console.log(err) }
                        );
    this.router.navigate(['/products']);
  }
}
