import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Model/iproduct';
import { ICategories } from 'src/app/Model/ICategories';
import { ISubCategories } from 'src/app/Model/ISubcategories';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductsService, private categoryService: CategoryService,
    private router: Router, private route: ActivatedRoute) { }

  id: number = 0;
  product: IProduct = {};
  categories: ICategories[] = [];
  subCategories: ISubCategories[] = [];
  clonedsubCategories: ISubCategories[] = [];

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.subCategories = this.categoryService.getSubCategories();   
    this.id = this.route.snapshot.params['id'];
    if (this.id > 0) {
      this.productService.getById(this.id).subscribe(data => {
        this.product = data;
      })
    }
  }

  onSubmit(data: NgForm) {

    console.log(data.value);

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
      this.updateProduct(this.id, product);
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

  updateProduct(id: number, product: IProduct) {
    this.productService.updateProduct(id, product).subscribe(data => {
      this.back();
    });
  }

  selectSubCategory(id: any) {
    this.clonedsubCategories=[...this.subCategories];
    this.clonedsubCategories = this.subCategories.filter(x => x.categoryId == parseInt(id));
  }


  back() {
    this.router.navigateByUrl("/products");
  }

}
