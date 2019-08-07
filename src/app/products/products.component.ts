import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
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
                this.productService.getAllProducts()
                       .subscribe( (listeProd) => { this.products = listeProd },
                                   (err) => { console.log(err) });
              }

  productSubscription: Subscription;
  nightModeSubscription: Subscription;
  products: Product[];
  nightMode: boolean;

  ngOnInit() { }

  onNewProduct() {
    this.router.navigate(['/products/new']);
  }

  onDeleteProduct(product: Product) {
    this.productService.removeProduct(product)
                       .subscribe(
                          (productDelete) => { console.log('Produit supprimer :' + productDelete) },
                          (err) => { console.log(err) }
                       );
  }

  getNightMode() {
    return this.appService.getNightMode();
  }
}
