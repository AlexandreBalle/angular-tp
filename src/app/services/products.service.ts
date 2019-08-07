import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private _headers = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }

  addProduct(product: Product): Observable<Product[]> {
    let urlWs = "./catalogue/private/products";
    console.log(product);
    return this.http.post<Product[]>(urlWs, product, {headers: this._headers});
  }

  getAllProducts(): Observable<Product[]> {
    let urlWs = "./catalogue/public/products";
    return this.http.get<Product[]>(urlWs);
  }

  removeProduct(product: Product) {
    let urlWs = "./catalogue/private/products/" + product.id;
    console.log(urlWs);
    return this.http.delete<void[]>(urlWs);
  }
}
