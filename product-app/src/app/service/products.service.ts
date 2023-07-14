import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product/product-list/product-list.component';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private products:HttpClient) { }

  URL:string = "http://localhost:16548/api/products";

  getAllProducts():Observable<IProduct[]>{
     return this.products.get<IProduct[]>(this.URL);
  }

  getById(id:number):Observable<IProduct>{
    return this.products.get<IProduct>(`${this.URL}/${id}`);
 }

  addProduct(product:IProduct){
    return this.products.post<IProduct>(this.URL,product);
  }

  updateProduct(id:number,product:IProduct){
    return this.products.put<IProduct>(`${this.URL}/${id}`,product);
  }

  deleteProduct(id:number){
    return this.products.delete(`${this.URL}/${id}`);
  }

}
