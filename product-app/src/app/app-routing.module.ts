import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product/product.component';
import { ProductListComponent } from './product/product-list/product-list.component';

const routes: Routes = [
  {path:'' , component:ProductListComponent},
  {path:'product' , component:ProductComponent},
  {path:'product/:id' , component:ProductComponent},
  {path:'**' , redirectTo:'',pathMatch:'full'} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
