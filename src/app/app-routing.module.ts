import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryTwoComponent } from './gallery-two/gallery-two.component';
import { ServiceComponent } from './service/service.component';
import { FaqComponent } from './faq/faq.component';
import { PriceComponent } from './price/price.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery-two/:name', component: GalleryTwoComponent },
  { path: 'service/:name', component: ServiceComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'price/:name', component: PriceComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
