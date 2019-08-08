import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  product: Product;

  constructor(private productService: ProductsService,
              private route: ActivatedRoute) {
    this.productService.findProduct(this.route.snapshot.params['id'])
                       .subscribe(
                         (prod) => { this.product = prod },
                         (err) => { console.log(err) }
                       );
  }

  ngOnInit() {
  }
}
