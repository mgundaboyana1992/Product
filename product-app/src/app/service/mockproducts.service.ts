import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, observable, of, throwError } from 'rxjs';
import { IProduct } from '../Model/IProduct';

@Injectable({
  providedIn: 'root'
})
export class MockProductsService {

 
  URL: string = "http://localhost:16548/api/products";

  getAllProducts(): Observable<IProduct[]> {
    return of(getProducts());
  }

  getById(id: number): Observable<IProduct> {
    return of(getProducts()[0]);
  }

  deleteProduct(id: number) {
    return of("");
  }

  searchProducts(params: any) {
    return of(getProducts()[0]);
  } 
  
  
}

function getProducts():IProduct[] {

  return [{id : 1, code: "1001", name: "SamsungTV", quantity: 10, price: 10000, description: "LED TV", image: "", category: 1, subCategory: 1 },
  {id : 2, code: "1002", name: "Redmi", quantity: 5, price: 50000, description: "Mobile", image: "", category: 1, subCategory: 2 }]
}
