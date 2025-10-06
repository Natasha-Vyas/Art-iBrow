import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  hero: any = {};
  brandName: any = '';
  public css: any;
  public social: any;
  public sliderImage: any;
  public currentMainSlide: number = 0;
  public currentProfSlide: number = 0;


  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.setTitleAndMetaTags();
    this.initializeSliders();
  }

  private initializeSliders(): void {
    // Wait a bit for data to be fully loaded, then initialize auto-slide
    setTimeout(() => {
      // Auto-slide functionality for main slider
      if (this.sliderImage && this.sliderImage.length > 1) {
        setInterval(() => {
          this.nextMainSlide();
        }, 4000); // Change slide every 4 seconds
      }
      
      // Auto-slide functionality for professional slider
      if (this.hero.slide && this.hero.slide.length > 1) {
        setInterval(() => {
          this.nextProfSlide();
        }, 4000); // Change slide every 4 seconds
      }
    }, 100);
  }

  private loadData(): void {
    // Load all required data from AppService
    this.hero = this.appService.getContentData('hero');
    this.brandName = this.appService.getContentData('brandName');
    this.sliderImage = this.appService.getContentData('slider');
    this.css = this.appService.getContentData('css');
    this.social = this.appService.getContentData('social');
  }

  setTitleAndMetaTags(): void {
    this.titleService.setTitle('Best Eyebrow Threading & Beauty Services Moreno Valley | ART iBrow');
    this.metaService.updateTag({
      name: 'description',
      content: 'Discover top beauty services at ART iBrow Threading Salon in Moreno Valley & Riverside, CA. Specializing in eyebrow threading, permanent makeup, skin tightening.'
    });
  }

  // Main slider methods
  nextMainSlide(): void {
    if (this.sliderImage && this.sliderImage.length > 0) {
      this.currentMainSlide = (this.currentMainSlide + 1) % this.sliderImage.length;
    }
  }

  previousMainSlide(): void {
    if (this.sliderImage && this.sliderImage.length > 0) {
      this.currentMainSlide = this.currentMainSlide === 0 ? this.sliderImage.length - 1 : this.currentMainSlide - 1;
    }
  }

  // Professional slider methods
  nextProfSlide(): void {
    if (this.hero.slide && this.hero.slide.length > 0) {
      this.currentProfSlide = (this.currentProfSlide + 1) % this.hero.slide.length;
    }
  }

  previousProfSlide(): void {
    if (this.hero.slide && this.hero.slide.length > 0) {
      this.currentProfSlide = this.currentProfSlide === 0 ? this.hero.slide.length - 1 : this.currentProfSlide - 1;
    }
  }

}

