import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

export interface IProduct{
  id:number;
  code :string;
  name :string;
  quantity :number;
  price :number;
  description :string;
  image :string;
}


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  constructor(private productsService:ProductsService){  }
  products:IProduct[] =[];

  ngOnInit(): void {
     this.productsService.getAllProducts().subscribe((data:IProduct[]) => {
       this.products = data;
    })
  }

  cols = ["Product Code", "Name", "Quantity", "Price", "Product Description","Image"];  

}
