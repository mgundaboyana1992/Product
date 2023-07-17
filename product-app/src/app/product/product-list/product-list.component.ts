import { Component, OnInit } from '@angular/core';
import { ICategories } from 'src/app/Model/ICategories';
import { ISubCategories } from 'src/app/Model/ISubCategories';
import { IProduct } from 'src/app/Model/IProduct';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  constructor(private productsService: ProductsService, private categoryService: CategoryService, private snackBar: MatSnackBar) { }
  products: IProduct[] = [];
  clonedProducts: IProduct[] = [];
  categories: ICategories[] = [];
  subCategories: ISubCategories[] = [];
  clonedsubCategories: ISubCategories[] = [];
  subcategory: number = -1;
  category: number = -1;
  name: string = '';

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.subCategories = this.categoryService.getSubCategories();
    this.getAllProducts();
  }

  cols = ["Product Code", "Name", "Quantity", "Price", "Product Description", "Image", "Action"];

  getAllProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (data: IProduct[]) => {
        this.products = data;
        this.clonedProducts = [...this.products];
        //this.snackBar.open(`${data.length} records found`,"",{duration:5000});
      },
      error: (err) => this.snackBar.open(err, "", { duration: 5000 })
    });
  }

  deleteProduct(id: any) {
    this.productsService.deleteProduct(id).subscribe({
      next: (data) => {
        this.snackBar.open(`Product Id ${id} deleted successfully`, "", { duration: 5000 });
        this.getAllProducts();
      },
      error: (err) => this.snackBar.open(err, "", { duration: 5000 })
    })
  }

  selectSubCategory(id: any) {
    if (id == -1) {
      this.subcategory = -1;
    }
    this.clonedsubCategories = [...this.subCategories];
    this.clonedsubCategories = this.subCategories.filter(x => x.categoryId == parseInt(id));
  }

  searchProducts() {
    let params = '';
    if (this.category != -1)
      params = `${params}category=${this.category}&`;
    if (this.subcategory != -1)
      params = `${params}subcategory=${this.subcategory}&`;
    if (this.name != "")
      params = `${params}name=${this.name}&`;

    if (params != '') {
      params = params.substring(0, params.lastIndexOf('&'));
      this.productsService.searchProducts(params).subscribe(data => {
        this.products = data;
      });
    }
    else {
      this.products = [...this.clonedProducts];
    }

  }

}
