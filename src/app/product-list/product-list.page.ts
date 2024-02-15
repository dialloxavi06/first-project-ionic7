import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { ProductServiceService } from '../product.service.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  products!: Array<Product>;
  constructor(
    private Product: ProductServiceService
  ) { }

  ngOnInit() {
    this.Product.getAll().subscribe((data: any) => {
      this.products = data;
    });
  } 

}
