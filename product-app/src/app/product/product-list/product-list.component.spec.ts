import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { ProductsService } from 'src/app/service/products.service';
import { MockProductsService } from 'src/app/service/mockproducts.service';
import { CategoryService } from 'src/app/service/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

class MatSnackBarStub {
  open() {
    return {
      onAction: () => of({})
    }
  }

}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule, RouterTestingModule],
      declarations: [ProductListComponent],
      providers: [{ provide: ProductsService, useClass: MockProductsService },
      { provide: CategoryService, useClass: CategoryService },
      { provide: MatSnackBar, useClass: MatSnackBarStub }
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getAllProducts() should return product data', async () => {
    component.getAllProducts();
    let result = component.clonedProducts;
    expect(result.length).toBe(2)
  });

  it('deleteProduct() should delete product data', async () => {
    spyOn(component, 'getAllProducts');
    component.deleteProduct(1);
    expect(component.getAllProducts).toHaveBeenCalled();
  });

  it('searchProducts() should filter product data', async () => {
    component.category = 1;
    component.subcategory = 1;
    component.searchProducts()
    let result = component.products;
    expect(result).toBeDefined();
  });

});
