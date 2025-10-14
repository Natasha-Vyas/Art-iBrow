import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../services/app.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public website: any;
  public brandName: any;
  public openingTimes: any;
  public address: any;
  public contact: any;
  public sliderImage: any;
  public email: any;
  public email4: any;
  public social: any;
  public css: any;
  public orderonline: any;
  public aboutus: any;
  public aboutUsData: any;
  public para: any;
  public hero: any;
  public about: any;
  public gallery: any;
  public templatetype: any;
  public success: boolean = false;
  public showMoreContent: boolean = false;
  public display: boolean = false;
  public currentSlide: number = 0;

  constructor(private appService: AppService, private titleService: Title, private metaService: Meta) {
    this.templatetype = this.appService.getContentData('templatetype') || '';
    this.openingTimes = this.appService.getContentData('openingTimes') || {};
    this.address = this.appService.getContentData('address') || '';
    this.contact = this.appService.getContentData('contact') || '';
    this.css = this.appService.getContentData('css') || {};
    this.orderonline = this.appService.getContentData('orderonline') || {};
    this.sliderImage = this.appService.getContentData('slider') || [];
    this.email = this.appService.getContentData('email') || '';
    this.email4 = this.appService.getContentData('email4') || '';
    this.social = this.appService.getContentData('social') || {};
    this.aboutus = this.appService.getContentData('story') || {};
    this.aboutUsData = this.appService.getContentData('aboutUs') || {};
    this.para = this.appService.getContentData('para') || '';
    this.hero = this.appService.getContentData('hero') || { aboutUs: [], aboutText: [] };
    this.about = this.appService.getContentData('about') || {};
    this.gallery = this.appService.getContentData('gallery') || [];
    this.brandName = this.appService.getContentData('brandName') || 'ART iBrow';
    this.website = this.appService.getContentData('type') || '';
  }

  ngOnInit(): void {
    this.setTitleAndMetaTags();
    // Auto-slide functionality
    if (this.hero.aboutUs && this.hero.aboutUs.length > 1) {
      setInterval(() => {
        this.nextSlide();
      }, 3000); // Change slide every 3 seconds
    }
  }

  nextSlide(): void {
    if (this.hero.aboutUs && this.hero.aboutUs.length > 0) {
      this.currentSlide = (this.currentSlide + 1) % this.hero.aboutUs.length;
    }
  }

  previousSlide(): void {
    if (this.hero.aboutUs && this.hero.aboutUs.length > 0) {
      this.currentSlide = this.currentSlide === 0 ? this.hero.aboutUs.length - 1 : this.currentSlide - 1;
    }
  }

  setTitleAndMetaTags(): void {
      this.titleService.setTitle('About ART iBrow | Expert Eyebrow Threading & Beauty Services.');
      this.metaService.updateTag({ name: 'description', content: 'Learn about ART iBrow, your go-to salon for expert threading, eyebrow tinting, microblading, facials, permanent makeup, waxing, eyelash extensions, and more beauty services.' });
  }

}
