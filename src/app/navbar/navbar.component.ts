import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Meta, Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  hero: any = {};
  brandName: any = '';
  public css: any;
  public social: any;
  public sliderImage: any;
  public menu: any;
  public categories: any;
  public menuOpen: boolean = false;
  public isScrolled: boolean = false;
  public logo: any;
  public sign: any;
  public address: any;
  public links: any;
  public website: any;
  public close: boolean = true;
  public popupCatering: boolean = false;
  public style: any;
  public host: any;
  public newItemsArr: any = [];
  public contact: any;
  public display: boolean = false;
  public kottuKornerDisplay: boolean = false;
  public restaurantURl: any;
  public orderonlineUrl: any;
  public openingTimes: any;
  public externalLink: any;
  public currentLink: any;
  public pickupUrl: any;
  public emailid: any;
  public navbarBrandName: any;
  public showHeader: boolean = false;
  public showHeader1: boolean = false;
  public isNavBarOpen = false;
  public isShowDownServices: boolean = false;
  public isSidebarOpen: boolean = false;
  public showDownloadOptions: boolean = false;
  public currentDate: Date = new Date();
  public currentMonth: string = '';
  public currentDay: number = 0;
  public currentYear: number = 0;
  public currentDayIndex: number = 0;
  public monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  public isDropdownOpen: boolean = false;
  public activeDropdown: string | null = null;
  public selectedNavCategory: any;

  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.setTitleAndMetaTags();
  }

  private loadData(): void {
    // Load all required data from AppService
    this.hero = this.appService.getContentData('hero');
    this.brandName = this.appService.getContentData('brandName');
    this.sliderImage = this.appService.getContentData('slider');
    this.css = this.appService.getContentData('css');
    this.social = this.appService.getContentData('social');
    this.logo = this.appService.getContentData('logo');
    this.sign = this.appService.getContentData('sign');
    this.brandName = this.appService.getContentData('brandName');
    this.menu = this.appService.getContentData('menu')[0];
    this.categories = this.appService.getContentData('menu')[0].menu[0]?.superCategory ? this.appService.getContentData('menu')[0].menu[0].superCategory[0].category : [];
    this.address = this.appService.getContentData('address');
    this.links = this.appService.getContentData('navbar').links;
    this.style = this.appService.getContentData('style');
    this.css = this.appService.getContentData('css');
    this.hero = this.appService.getContentData('hero');
    this.contact = this.appService.getContentData('contact');
    this.social = this.appService.getContentData('social');
    this.emailid = this.appService.getContentData('email');
    this.navbarBrandName = this.appService.getContentData('navbarBrandName');
    this.openingTimes = this.appService.getContentData('openingTimes');
    this.externalLink = this.appService.getContentData('externalLink');
    this.website = this.appService.getContentData('type');
    this.host = window.location.href.split('/');
    this.host = this.host[this.host.length - 1];
    const today = new Date().getDay();
    this.currentDayIndex = today > 0 ? today - 1 : 6;
    this.currentDate = new Date();

    this.currentMonth = this.monthNames[this.currentDate.getMonth()];
    this.currentDay = this.currentDate.getDate();
    this.currentYear = this.currentDate.getFullYear();
  }

  setTitleAndMetaTags(): void {
    this.titleService.setTitle('Best Eyebrow Threading & Beauty Services Moreno Valley | ART iBrow');
    this.metaService.updateTag({
      name: 'description',
      content: 'Discover top beauty services at ART iBrow Threading Salon in Moreno Valley & Riverside, CA. Specializing in eyebrow threading, permanent makeup, skin tightening.'
    });
  }

  dropdownOption(link: any) {
    if (this.activeDropdown === link.text) {
      this.isDropdownOpen = !this.isDropdownOpen;
    } else {
      this.isDropdownOpen = true;
    }
    this.activeDropdown = link.text;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  toggleSubCategories(option: any) {
    if (this.selectedNavCategory?.name === option.name) {
      this.selectedNavCategory = null;
    } else {
      this.selectedNavCategory = option;
    }
  }

  change(value: boolean) {
    this.close = value;
  }

  keepDropdownOpen() {
    // Keep dropdown open when hovering over it
  }

}
