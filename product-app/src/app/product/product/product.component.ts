import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  cols = ["Product Code", "Name", "Quantity", "Price", "Product Description","Image"]

  products = [
    {code: 'Title 1', name: 'Content 1',quantity:"",price:"",description:"",image:""},
    {code: 'Title 1', name: 'Content 1',quantity:"",price:"",description:"",image:""},
    {code: 'Title 1', name: 'Content 1',quantity:"",price:"",description:"",image:""}
  ];

}
