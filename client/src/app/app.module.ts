import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { AccountModule } from './account/account.module';
import { BasketModule } from './basket/basket.module';
import { CheckoutModule } from './checkout/checkout.module';
import { JWTInterceptor } from './core/interceptors/jwt.interceptor';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,        
    HomeModule,
    NgxSpinnerModule,
    BasketModule,
    CheckoutModule,
    OrderModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:SpinnerInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:JWTInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
