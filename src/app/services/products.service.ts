import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsSubject = new Subject<Product[]>();
  products = [
    {
      name: 'Cahier',
      price: 5
    },
    {
      name: 'Gomme',
      price: 2
    },
    {
      name: 'Trousse',
      price: 10
    }
  ];
  constructor() {
    this.getProducts();
  }

  emitProducts() {
    this.productsSubject.next(this.products);
  }

  getProducts() {
    return this.products;
  }

  removeProduct(product: Product) {
    const productIndex = this.products.findIndex(
      (productValue) => {
        if(productValue === product) {
          return true;
        }
      }
    );
    this.products.splice(productIndex, 1);
    this.emitProducts();
  }

}
