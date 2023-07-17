import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, observable, throwError } from 'rxjs';
import { IProduct } from '../Model/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private products: HttpClient) { }

  URL: string = "http://localhost:16548/api/products";

  getAllProducts(): Observable<IProduct[]> {
    return this.products.get<IProduct[]>(this.URL).pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<IProduct> {
    return this.products.get<IProduct>(`${this.URL}/${id}`).pipe(catchError(this.handleError));;
  }

  addProduct(product: IProduct) {
    return this.products.post<IProduct>(this.URL, product).pipe(catchError(this.handleError));;
  }

  updateProduct(id: number, product: IProduct) {
    return this.products.put<IProduct>(`${this.URL}/${id}`, product).pipe(catchError(this.handleError));;
  }

  deleteProduct(id: number) {
    return this.products.delete(`${this.URL}/${id}`).pipe(catchError(this.handleError));;
  }

  searchProducts(params: any) {
    return this.products.get<IProduct[]>(`${this.URL}/Search?${params}`).pipe(catchError(this.handleError));;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      return throwError(() => new Error(`An error occurred:${error.message} error was:${error.error}`));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
        return throwError(() => new Error(`Backend returned code ${error.status} body was: ${error.message}  error was:${error.error}`));
    }
  }
  
}
