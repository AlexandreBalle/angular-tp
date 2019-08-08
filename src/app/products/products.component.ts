import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductsService } from '../services/products.service';
import { AppService } from '../services/app.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductsService,
              private appService: AppService,
              private router: Router) {
                this.onGetProducts();
              }

  products: Product[];

  ngOnInit() { }

  onNewProduct() {
    this.router.navigate(['/products/new']);
  }

  onDeleteProduct(product: Product) {
    this.productService.removeProduct(product)
                       .subscribe(
                          () => { this.onGetProducts() },
                          (err) => { console.log(err) }
                       );
  }

  getNightMode() {
    return this.appService.getNightMode();
  }

  onViewProduct(product: Product) {
    this.router.navigate(['/products/', product._id]);
  }

  onGetProducts() {
    this.productService.findAllProducts()
                       .subscribe(
                         (listeProd) => { this.products = listeProd },
                         (err) => { console.log(err) }
                       );
  }
}
