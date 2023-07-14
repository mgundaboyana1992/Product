import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product/product-list/product-list.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private products:HttpClient) { }

  GETURL:string = "http://localhost:16548/api/products"

  getAllProducts():Observable<IProduct[]>{
     return this.products.get<IProduct[]>(this.GETURL);
  }
}
