import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  public website: any;
  public gallery: any;
  public story: any;
  public css: any;
  public showHiddenImages: boolean = false;
  public success: boolean = false;
  public brandName: any;
  public host: any = [];
  public menu: any;
  public menu2: any;
  public categories: any;
  public categories2: any;
  public product: any;
  public selectedCategory: any;
  public selectedCategorySwadeshi: any;
  public social: any;
  public All: boolean = true;
  public AtuoDeal: boolean = false;
  public HandPolish: boolean = false;
  public HandWash: boolean = false;
  public HandWax: boolean = false;
  public tripleFoam: boolean = false;
  public sliderImages: any;
  public galleryImages: any;
  public currentImages: string[] = [];
  public hero: any;
  public showModal = false;
  public isModalOpen = false;
  public currentItem: string | null = null;
  public firstTab: any;
  public currentIndex: number = 0;
  public currentCategoryIndex: number = 0;
  public templatetype: any;
  public selectedImg: string = "https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/7da382b6-d656-4b03-b284-48406b7be57c.png";

  constructor(private appService: AppService, private elementRef: ElementRef, private renderer: Renderer2, private router: Router, private titleService: Title, private metaService: Meta) {
    this.templatetype = this.appService.getContentData('templatetype')
    this.brandName = this.appService.getContentData('brandName');
    this.story = this.appService.getContentData('story');
    this.css = this.appService.getContentData('css');
    this.social = this.appService.getContentData('social');
    this.hero = this.appService.getContentData('hero');
    this.sliderImages = this.appService.getContentData('slider');
    this.galleryImages = this.appService.getContentData('gallery');
    this.host = window.location.href.split('/');
    this.host = this.host[this.host.length - 1];
    this.menu = this.appService.getContentData('menu')[0];
    this.menu2 = this.appService.getContentData('menu')[0].menu;
    this.categories = this.appService.getContentData('menu')[0].menu[0].superCategory[0].category;
    this.categories2 = this.appService.getContentData('menu')[0].menu2 ? this.appService.getContentData('menu')[0].menu2[0].superCategory[0].category : [];
    this.website = this.appService.getContentData('type');
    this.gallery = this.appService.getContentData('gallery');
    this.story = this.appService.getContentData('story');
  }

  ngOnInit(): void {
    this.setTitleAndMetaTags();
    if (this.brandName == 'ART iBrow Threading Salon') {
      this.getDiv(0, this.menu.menu[0].superCategory[0].category[0]);
    }
  }

  getDiv(index: any, item: any) {
    if (item?.items?.length) {
      this.product = item;
      this.selectedCategory = index;
      this.router.navigate([`/gallery`], { fragment: item.routeName });
    } else {
      this.product = undefined;
      this.selectedCategory = index;
      this.router.navigate([`/gallery`]);
    }
  }

  onCategoryChange(index: number) {
    const selectedCategory = this.categories[index];
    this.getDiv(index, selectedCategory);
  }

  setTitleAndMetaTags(): void {
    if (this.brandName == "ART iBrow Threading Salon") {
      this.titleService.setTitle('Top-Rated Eyebrow Threading & Beauty Services Near You | Gallery');
      this.metaService.updateTag({ name: 'description', content: 'Explore our gallery showcasing top-rated services, including eyebrow threading, tinting, microblading, facials, permanent makeup, waxing, eyelash extensions, and more.' });
    }
  }

}
