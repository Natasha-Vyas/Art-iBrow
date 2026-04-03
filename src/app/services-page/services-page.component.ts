import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  @ViewChild('menuSections') menuSections?: ElementRef<HTMLElement>;

  public css: any;
  public contact: any;
  public social: any;
  public hero: any;
  public categories: any[] = [];
  public dedicatedServiceLinks: Set<string> = new Set();

  constructor(
    private appService: AppService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    this.css = this.appService.getContentData('css');
    this.contact = this.appService.getContentData('contact');
    this.social = this.appService.getContentData('social');
    this.hero = this.appService.getContentData('hero');

    const menuCategories = this.appService.getContentData('menu')[0].menu[0].superCategory
      ? this.appService.getContentData('menu')[0].menu[0].superCategory[0].category
      : [];

    this.categories = menuCategories;
    this.dedicatedServiceLinks = this.extractDedicatedServiceLinks(this.appService.getContentData('navbar')?.links || []);
    this.setTitleAndMetaTags();
  }

  private extractDedicatedServiceLinks(links: any[]): Set<string> {
    const serviceLinks = new Set<string>();

    const collectLinks = (items: any[]) => {
      items.forEach((item: any) => {
        if (item?.link && typeof item.link === 'string' && item.link.startsWith('/service/')) {
          serviceLinks.add(item.link);
        }

        if (item?.options?.length) {
          collectLinks(item.options);
        }
      });
    };

    collectLinks(links);
    return serviceLinks;
  }

  hasDedicatedServicePage(item: any): boolean {
    return !!item?.link && this.dedicatedServiceLinks.has(item.link);
  }

  getCategoryAnchor(category: any): string {
    const value = category?.routeName || category?.categoryName || '';

    return value
      .toString()
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  scrollToCategory(category: any): void {
    const anchor = this.getCategoryAnchor(category);
    const element = document.getElementById(anchor);

    if (!element) {
      return;
    }

    const menuSections = this.menuSections?.nativeElement;

    if (menuSections && menuSections.scrollHeight > menuSections.clientHeight) {
      const targetTop = element.getBoundingClientRect().top - menuSections.getBoundingClientRect().top + menuSections.scrollTop;
      menuSections.scrollTo({ top: Math.max(targetTop - 8, 0), behavior: 'smooth' });
      return;
    }

    const navbar = document.querySelector('.heading') as HTMLElement | null;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const spacingBelowNavbar = 48;
    const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight - spacingBelowNavbar;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  private setTitleAndMetaTags(): void {
    this.titleService.setTitle('All Services & Prices | ART iBrow');
    this.metaService.updateTag({
      name: 'description',
      content: 'Browse all ART iBrow services and prices on one page, including threading, facials, waxing, permanent makeup, lashes, and more.'
    });
  }
}
