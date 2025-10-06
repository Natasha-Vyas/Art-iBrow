import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgImageSliderModule } from 'ng-image-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FaqComponent } from './faq/faq.component';
import { FormComponent } from './form/form.component';
import { FailedComponent } from './failed/failed.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryTwoComponent } from './gallery-two/gallery-two.component';
import { PriceComponent } from './price/price.component';
import { PaymentComponent } from './payment/payment.component';
import { PolicyComponent } from './policy/policy.component';
import { ProductComponent } from './product/product.component';
import { ServiceComponent } from './service/service.component';
import { SuccessComponent } from './success/success.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutUsComponent,
    CartComponent,
    CheckoutComponent,
    ContactUsComponent,
    FaqComponent,
    FormComponent,
    FailedComponent,
    GalleryComponent,
    GalleryTwoComponent,
    PriceComponent,
    PaymentComponent,
    PolicyComponent,
    ProductComponent,
    ServiceComponent,
    SuccessComponent,
    TestimonialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
