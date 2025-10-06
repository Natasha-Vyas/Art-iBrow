import { Component, HostListener, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public template: any;
  public footerlogo: any;
  public footerText: any;
  public css: any;
  public links: any;
  public social: any;
  public openingTimes: any;
  public openingTimesMoreno: any;
  public openingTimesRiverside: any;
  public openingTimesLocation: any;
  public brandName: any;
  public address: any;
  public address2: any;
  public address3: any;
  public contact: any;
  public contactNew: any;
  public emailid: any;
  public hero: any;
  public orderMenuOpen = false;
  public floatingBtn: boolean = true;

  constructor(private appService: AppService) {
    this.template = this.appService.getContentData('template') || {};
    this.footerlogo = this.appService.getContentData('footerlogo') || '';
    this.footerText = this.appService.getContentData('footerText') || '';
    this.emailid = this.appService.getContentData('email') || '';
    this.css = this.appService.getContentData('css') || {};
    this.openingTimes = this.appService.getContentData('openingTimes') || {};
    this.openingTimesLocation = this.appService.getContentData('openingTimesLocation') || {};
    this.openingTimesMoreno = this.appService.getContentData('openingTimesMoreno') || {};
    this.openingTimesRiverside = this.appService.getContentData('openingTimesRiverside') || {};
    this.social = this.appService.getContentData('social') || {};
    const navbarData = this.appService.getContentData('navbar') || {};
    this.links = navbarData.links || [];
    this.brandName = this.appService.getContentData('brandName') || 'ART iBrow';
    this.address = this.appService.getContentData('address') || '';
    this.address2 = this.appService.getContentData('address2') || '';
    this.address3 = this.appService.getContentData('address3') || '';
    this.contact = this.appService.getContentData('contact') || '';
    this.contactNew = this.appService.getContentData('contactNew') || {};
    this.hero = this.appService.getContentData('hero') || {};
    this.floatingBtn = this.appService.getContentData('floatingBtn') || false;
  }

  ngOnInit(): void {
  }

  toggleOrderMenu(): void {
    this.orderMenuOpen = !this.orderMenuOpen;
  }


  @HostListener('document:click')
  closeOrderMenu() {
    this.orderMenuOpen = false;
  }

  closeAfterNavigate(): void {
    this.orderMenuOpen = false;
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

}
