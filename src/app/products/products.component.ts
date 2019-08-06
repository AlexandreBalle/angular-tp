import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productSubscription: Subscription;
  products: Product[];
  constructor(private productService: ProductsService,
              private router: Router) { }

  ngOnInit() {
    this.productSubscription = this.productService.productsSubject.subscribe(
      (products: Product[]) => {
        this.products = products;
      }
    );
    this.productService.emitProducts();
  }

  onNewProduct() {
    this.router.navigate(['/products/new']);
  }

  onDeleteProduct(product: Product) {
    this.productService.removeProduct(product);
  }
}
