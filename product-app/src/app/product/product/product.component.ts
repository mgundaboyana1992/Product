import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { IProduct } from '../product-list/product-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductsService, private router: Router, private route: ActivatedRoute) { }

  id: number = 0;
  product:IProduct = {};

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id > 0){
      this.productService.getById(this.id).subscribe(data =>{
        this.product = data;
      })
    }
  }

  onSubmit(data: NgForm) {

    let product: IProduct = {
      code: data.value.code,
      name: data.value.name,
      description: data.value.description,
      quantity: data.value.quantity,
      price: data.value.price,
      image: data.value.image
    }

    if (this.id > 0) {
      product.id = this.id;
      this.updateProduct(this.id,product);
    }
    else {
      this.addProduct(product);
    }
  }

  addProduct(product: IProduct) {
    this.productService.addProduct(product).subscribe(data => {
      this.back();
    });
  }

  updateProduct(id:number,product: IProduct) {
    this.productService.updateProduct(id,product).subscribe(data => {
      this.back();
    });
  }

  back() {
    this.router.navigateByUrl("/products");
  }

}
