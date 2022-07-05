import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path:'',component:HomeComponent,data:{breadcrumb:'Home'}},
  {path:'test-error',component:TestErrorComponent,data:{breadcrumb:'test-error'}},
  {path:'server-error',component:ServerErrorComponent,data:{breadcrumb:'server-error'}},
  {path:'not-found',component:NotFoundComponent,data:{breadcrumb:'not-found'}},
  {path:'shop',loadChildren:()=>import("./shop/shop.module").then(module=>module.ShopModule),data:{breadcrumb:'Shop'}},
  {path:'basket',loadChildren:()=>import("./basket/basket.module").then(module=>module.BasketModule),data:{breadcrumb:'Basket'}},
  {path:'checkout',loadChildren:()=>import("./checkout/checkout.module").then(module=>module.CheckoutModule),data:{breadcrumb:'Checkout'}},
  {path:'**',redirectTo:'not-found'}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
