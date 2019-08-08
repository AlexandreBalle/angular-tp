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
    return this.http.post<Product[]>(urlWs, product, {headers: this._headers});
  }

  findProduct(product: string): Observable<Product> {
    let urlWs = "./catalogue/public/products/" + product;
    return this.http.get<Product>(urlWs, {headers: this._headers});
  }

  findAllProducts(): Observable<Product[]> {
    let urlWs = "./catalogue/public/products";
    return this.http.get<Product[]>(urlWs);
  }

  removeProduct(product: Product) {
    let urlWs = "./catalogue/private/products/" + product._id;
    return this.http.delete<any>(urlWs, {headers: this._headers});
  }
}
