import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';


import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductEditGuard } from './product-edit.guard';
import { AuthGuard } from '../route.guard';
import { CategoryComponent } from '../category/category.component';
import { AdminGuard } from '../admin.guard';
import { CategoryAddComponent } from '../category-add/category-add.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'products', canActivate:[AuthGuard], component: ProductListComponent },
      { path: 'products/:id', canActivate:[AuthGuard], component: ProductDetailComponent },
      {
        path: 'products/:id/edit',
        canActivate: [AdminGuard],
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent
      }, 
      { path: 'category', canActivate:[AuthGuard], component: CategoryComponent },
      { path: 'categories/add', canActivate:[AdminGuard], component: CategoryAddComponent },
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent
  ]
})
export class ProductModule { }
