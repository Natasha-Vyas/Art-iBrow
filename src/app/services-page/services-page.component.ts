import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppService } from '../services/app.service';

interface ServicesPageItem {
  itemName?: string;
  itemPrice?: string;
}

interface ServicesPageCategory {
  categoryName?: string;
  items?: ServicesPageItem[];
}

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.scss']
})
export class ServicesPageComponent implements OnInit {
  @ViewChild('servicesPageRoot') private servicesPageRoot?: ElementRef<HTMLElement>;

  public categories: ServicesPageCategory[] = [];
  public posterBrand = 'ART iBrow';
  public isDownloadingPdf = false;

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
      .filter((category: ServicesPageCategory) => Array.isArray(category?.items) && category.items.length > 0)
      .sort((firstCategory: ServicesPageCategory, secondCategory: ServicesPageCategory) =>
        (secondCategory.items?.length || 0) - (firstCategory.items?.length || 0)
      );

    this.setTitleAndMetaTags();
  }

  getDisplayCategoryName(category: ServicesPageCategory): string {
    return (category?.categoryName || '')
      .toString()
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  async downloadPriceListPdf(): Promise<void> {
    if (!this.categories.length || this.isDownloadingPdf || !this.servicesPageRoot?.nativeElement) {
      return;
    }

    this.isDownloadingPdf = true;

    let exportHost: HTMLDivElement | null = null;

    try {
      const sourceElement = this.servicesPageRoot.nativeElement;
      const exportElement = this.createPdfExportClone(sourceElement);
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);

      exportHost = document.createElement('div');
      exportHost.setAttribute('aria-hidden', 'true');
      exportHost.style.position = 'fixed';
      exportHost.style.left = '-20000px';
      exportHost.style.top = '0';
      exportHost.style.pointerEvents = 'none';
      exportHost.style.opacity = '1';
      exportHost.style.zIndex = '-1';
      exportHost.appendChild(exportElement);
      document.body.appendChild(exportHost);

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

      const canvas = await html2canvas(exportElement, {
        backgroundColor: '#f5f1eb',
        logging: false,
        scale: Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2),
        useCORS: true,
        width: exportElement.scrollWidth,
        height: exportElement.scrollHeight,
        windowWidth: exportElement.scrollWidth,
        windowHeight: exportElement.scrollHeight
      });

      const pdfWidth = canvas.width * 0.75;
      const pdfHeight = canvas.height * 0.75;
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [pdfWidth, pdfHeight],
        compress: true
      });

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      );
      pdf.save(this.getPdfFileName());
    } catch (error) {
      console.error('Unable to generate services PDF.', error);
    } finally {
      exportHost?.remove();
      this.isDownloadingPdf = false;
    }
  }

  private createPdfExportClone(sourceElement: HTMLElement): HTMLElement {
    const exportWidth = Math.max(window.innerWidth, 1280);
    const clone = sourceElement.cloneNode(true) as HTMLElement;

    clone.style.width = `${exportWidth}px`;
    clone.style.maxWidth = `${exportWidth}px`;
    clone.style.minHeight = 'auto';
    clone.style.margin = '0';
    clone.style.position = 'relative';
    clone.style.left = '0';
    clone.style.top = '0';

    clone.querySelectorAll('.poster-actions').forEach((element) => element.remove());

    return clone;
  }

  private getPosterBrandName(brandName: string): string {
    const cleanedName = brandName
      .replace(/\bthreading salon\b/i, '')
      .replace(/\s+/g, ' ')
      .trim();

    return cleanedName || 'ART iBrow';
  }

  private getPdfFileName(): string {
    const slug = this.posterBrand
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return `${slug || 'art-ibrow'}-services-price-list.pdf`;
  }

  private setTitleAndMetaTags(): void {
    this.titleService.setTitle('All Services & Prices | ART iBrow');
    this.metaService.updateTag({
      name: 'description',
      content: 'Browse all ART iBrow services and prices on one page, including threading, facials, waxing, permanent makeup, lashes, and more.'
    });
  }
}
