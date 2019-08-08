import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { ProductFormComponent } from './products/product-form/product-form.component';


const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id', component: SingleProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
