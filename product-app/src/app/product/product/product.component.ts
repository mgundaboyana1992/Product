import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/service/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Model/IProduct';
import { ICategories } from 'src/app/Model/ICategories';
import { CategoryService } from 'src/app/service/category.service';
import { ISubCategories } from 'src/app/Model/ISubCategories';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductsService, private categoryService: CategoryService,
    private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  id: number = 0;
  product: IProduct = {};
  categories: ICategories[] = [];
  subCategories: ISubCategories[] = [];
  clonedsubCategories: ISubCategories[] = [];
  isError:boolean = false;

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.subCategories = this.categoryService.getSubCategories();
    this.id = this.route.snapshot.params['id'];
    if (this.id > 0) {
      this.productService.getById(this.id).subscribe({
        next: data => {
          this.isError=false;
          this.selectSubCategory(data.category);
          console.log(this.clonedsubCategories);
          this.product = data;
        },
        error: (err) => {
          this.isError=true;
          this.snackBar.open(err, "", { duration: 5000 });
        }
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
      image: data.value.image,
      category: data.value.category,
      subCategory: data.value.subcategory
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
    this.productService.addProduct(product).subscribe({
      next: (data) => {
        this.isError=false;
        this.snackBar.open(`Product Name ${data.name} added successfully`, "", { duration: 5000 });
        this.back();
      },
      error: (err) => {
        this.isError=true;
        this.snackBar.open(err, "", { duration: 5000 });
      }
    });
  }

  updateProduct(id: number, product: IProduct) {
    this.productService.updateProduct(id, product).subscribe({
      next: (data) => {
        this.isError=false;
        this.snackBar.open(`Product Code ${data.code} updated successfully`, "", { duration: 5000 });
        this.back();
      },
      error: (err) => {
        this.isError=true;
        this.snackBar.open(err, "", { duration: 5000 });
      }
    });
  }

  selectSubCategory(id: any) {
    this.clonedsubCategories = [...this.subCategories];
    this.clonedsubCategories = this.subCategories.filter(x => x.categoryId == parseInt(id));
  }

  back() {
    this.router.navigateByUrl("/products");
  }

}
