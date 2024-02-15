import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListPage } from './product-list.page';

const routes: Routes = [
  {
    path: '',
    component: ProductListPage
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'product-new',
    loadChildren: () => import('./product-new/product-new.module').then( m => m.ProductNewPageModule)
  },
  { 
    path: ':id',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductListPageRoutingModule {}
