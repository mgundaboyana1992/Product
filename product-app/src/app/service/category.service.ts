import { Injectable } from '@angular/core';
import { ICategories } from '../Model/ICategories';
import { ISubCategories } from '../Model/ISubcategories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories(): ICategories[] {
    return [{ id: 1, name: "Electronic" },{ id: 2, name: "Apparel" },{ id: 3, name: "Footwear" }];
  }

  getSubCategories(): ISubCategories[] {
    return [{ id: 1, name: "TV" ,categoryId:1}, { id: 2, name: "Mobile",categoryId:1 }, { id: 3, name: "Referigerator",categoryId:1 },
    { id: 4, name: "Mens Cloth",categoryId:2 }, { id: 5, name: "Women Cloth",categoryId:2 },
    { id: 6, name: "Mens Footwear",categoryId:3 }, { id: 7, name: "Women Footwear",categoryId:3 }
    ];
  }

}
