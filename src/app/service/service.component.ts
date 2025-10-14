import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../services/app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterPreloader, ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  public host: any;
  public website: any;
  public service: any;
  public social: any;
  public hero: any;
  public categories: any;
  public brandName: any;
  public css: any;
  public contact: any;
  public email: any;
  public showHiddenImages: boolean = false;
  public success: boolean = false;
  public All: boolean = true;
  public HandPolish: boolean = false;
  public faq: any;
  public product: any;
  public selectedCategory: any;
  public menu: any;
  public artIBrowService: any;
  public routeSubscription: any;
  public currentRouteParams: any;
  public currentSelectedBanner: any;
  public story: any;
  public currentIndex = 0;
  public showPopup: boolean = true;
  public image: any;
  public slides: any[] = [];
  public currentMissipiIndex = 0;
  public transformStyle: string = '';
  public intervalMissipiId: any;
  public currentSlide = 0;

  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute, private metaService: Meta, private titleService: Title, private viewportScroller: ViewportScroller) {
    this.host = window.location.href.split('/');
    this.host = this.host[this.host.length - 1];
    this.menu = this.appService.getContentData('menu')[0];
    this.categories = this.appService.getContentData('menu')[0].menu[0].superCategory[0].category;
    this.css = this.appService.getContentData('css');
    this.social = this.appService.getContentData('social');
    this.hero = this.appService.getContentData('hero');
    this.contact = this.appService.getContentData('contact');
    this.email = this.appService.getContentData('email');
    this.faq = this.appService.getContentData('faq');
    this.story = this.appService.getContentData('story');
    this.brandName = this.appService.getContentData('brandName');
  }

  ngOnInit(): void {
    this.setTitleAndMetaTags();
    this.activatedRoute.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    });
    this.prepareSlides();
    this.website = this.appService.getContentData('type');
    if (this.menu.menu[0].superCategory.length && (this.brandName == 'Singh Law HQ' || this.brandName == 'CaptiCon Inc')) {
      this.getDiv(0, this.menu.menu[0].superCategory[0].category[0]);
    }
    this.service = this.appService.getContentData('service');
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.currentRouteParams = params['name'];

      this.artIBrowService = this.hero && this.hero.services ? (this.hero.services?.filter((ele: any) => ele.label !== params['name'])) : [];
      this.currentSelectedBanner = this.hero && this.hero.services ? this.hero && this.hero.services?.filter((ele: any) => ele.label === params['name']) : [];
      if (this.hero && this.hero.allservices2) {
        this.currentSelectedBanner = this.hero && this.hero.allservices2 ? this.hero && this.hero.allservices2?.filter((ele: any) => ele.label === params['name']) : [];
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  toggleContent2(key: string, index: number) {
    this.hero.hosts[key][0].faq[index].open = !this.hero.hosts[key][0].faq[index].open;
  }

  getDiv(index: any, item: any) {
    if (item.items.length) {
      this.product = item;
      this.selectedCategory = index;
      this.router.navigate([`/service/${this.host}`]);
    } else {
      this.product = undefined;
      this.selectedCategory = index;
      this.router.navigate([`/service/${this.host}`]);
    }
  }

  prepareSlides() {
    // Initialize slides array if needed
    if (!this.slides) {
      this.slides = [];
    }
    // Add any slide preparation logic here
  }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  setTitleAndMetaTags(): void {
      this.titleService.setTitle('Top-Rated Eyebrow Threading & Beauty Services Near You | Gallery');
      this.metaService.updateTag({ name: 'description', content: 'Explore our gallery showcasing top-rated services, including eyebrow threading, tinting, microblading, facials, permanent makeup, waxing, eyelash extensions, and more.' });
  }

}
