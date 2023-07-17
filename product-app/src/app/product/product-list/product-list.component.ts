import { Component, OnInit } from '@angular/core';
import { ICategories } from 'src/app/Model/ICategories';
import { ISubCategories } from 'src/app/Model/ISubcategories';
import { IProduct } from 'src/app/Model/iproduct';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  constructor(private productsService: ProductsService,private categoryService: CategoryService) { }
  products: IProduct[] = [];
  categories: ICategories[] = [];
  subCategories: ISubCategories[] = [];
  clonedsubCategories: ISubCategories[] = [];
  subcategory:number=0;
  category:number=0;

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.subCategories = this.categoryService.getSubCategories();   
    this.getAllProducts();
  }

  cols = ["Product Code", "Name", "Quantity", "Price", "Product Description", "Image", "Action"];

  getAllProducts() {
    this.productsService.getAllProducts().subscribe((data: IProduct[]) => {
      this.products = data;
    });
  }

  deleteProduct(id:any) {
    this.productsService.deleteProduct(id).subscribe((data) => {
      this.getAllProducts();
    })
  }

  selectSubCategory(id: any) {
    this.clonedsubCategories=[...this.subCategories];
    this.clonedsubCategories = this.subCategories.filter(x => x.categoryId == parseInt(id));
  }

}
