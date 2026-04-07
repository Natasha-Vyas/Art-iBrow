import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  public categories: any[] = [];
  public posterBrand = 'ART iBrow';

  constructor(
    private appService: AppService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit(): void {
    const brandName = this.appService.getContentData('brandName') || '';
    this.posterBrand = this.getPosterBrandName(brandName);

    const menuCategories = this.appService.getContentData('menu')?.[0]?.menu?.[0]?.superCategory?.[0]?.category || [];

    this.categories = [...menuCategories]
      .filter((category: any) => Array.isArray(category?.items) && category.items.length > 0)
      .sort((firstCategory: any, secondCategory: any) =>
        (secondCategory.items?.length || 0) - (firstCategory.items?.length || 0)
      );
    this.setTitleAndMetaTags();
  }

  getDisplayCategoryName(category: any): string {
    return (category?.categoryName || '')
      .toString()
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private getPosterBrandName(brandName: string): string {
    const cleanedName = brandName
      .replace(/\bthreading salon\b/i, '')
      .replace(/\s+/g, ' ')
      .trim();

    return cleanedName || 'ART iBrow';
  }

  private setTitleAndMetaTags(): void {
    this.titleService.setTitle('All Services & Prices | ART iBrow');
    this.metaService.updateTag({
      name: 'description',
      content: 'Browse all ART iBrow services and prices on one page, including threading, facials, waxing, permanent makeup, lashes, and more.'
    });
  }
}
