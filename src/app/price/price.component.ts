import { Component, OnInit, ElementRef, ViewChild, QueryList, ViewChildren, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { ViewportScroller } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {
  @ViewChildren('categoryButton') categoryButtons!: QueryList<ElementRef<HTMLButtonElement>>;
  public myselectedCategory: any = 0;
  public currentFragment: string = '';

  @HostListener('window:hashchange', ['$event'])
  onHashChange() {
    this.currentFragment = window.location.hash.replace('#', '');
  }



  public menu: any;
  public menu2: any;
  public logo: any;
  public menu3: any;
  public website: any;
  public categories: any;
  public categoriesPennequine: any;
  public categories2: any;
  public categories3: any;
  public product: any;
  public selectedCategory: any;
  public selectedCategoryName: any;
  public subCategories: any;
  public delhiMenuCategory: any;
  public selectedCategorySwadeshi: any;
  public selectedCategoryVinos: any;
  public menuImages: any;
  public categoryImages: any;
  public brandName: any;
  public css: any;
  public address: any;
  public selectedRestaurant: any;
  public sliderImage: any;
  public host: any = [];
  public multiMenu: any;
  public dataList: Array<any> = [];
  public searchText: any = "";
  public searchedObj = {};
  public showDiv: boolean = false;
  public menuItemFound: boolean = false;
  public categoryItemFound: boolean = false;
  public menuItemImage: string = '';
  public categoryItemImage: string = '';
  public newItemsArr: any = [];
  public cart: any = [];
  public produc: any = [];
  public social: any;
  public display: any = {};
  public vinoCart: any = [];
  public custom: any = [];
  public totalPrice: any = 0;
  public crust: any;
  public pizza: any;
  public itemImage: any = "";
  public finalCustom: any = [];
  public removeCustom: any = [];
  public fullArray: any = [];
  public productObj: any = {};
  public mealTypes: string[] = [];
  public selectedMealType: any = '';
  public realPrice: any = 0;
  public windowScrolled: any;
  public hero: any;
  public navbar: any;
  public lovedDishes: any;
  public success: any = false;
  public activeSlideIndex: any = 0;
  public contact: any;
  public routeSubscription: any;
  public routeCategory: any;
  public mealCategory: any;
  public teluguFoodHutSelectedCategory = "cat1";
  public selectedCustomization: any;
  public showCustomizationOptions: boolean = false;
  public matchingCategory: any;
  public subcategory: any;
  public selectedCategoryData: any;
  @ViewChild('categorySection') categorySection: ElementRef | undefined;
  @ViewChild('categoryContainer') categoryContainer: ElementRef | undefined;
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  public data2: any = {
    "logo": "https://s3.ap-south-1.amazonaws.com/cdn.ghc.health/18efe2f4-d3d3-4f46-8772-d36bc989688c_addLogo.png",
    "brandName": "Are you Hungry?",
    "heading": "DONT WAIT!",
    "tagLine": "LET START TO ORDEER FOOD NOW",
    "tagLine2": "Don't Miss our Menu!"
  }
  public filteredCategories: any;
  public templatetype: any;
  openIndex: number | null = null;
  hoverIndex: number | null = null;

  navigateToCategory() {
    if (this.selectedCategory === 'all') {
      // If 'All' is selected, navigate to the main menu page
      this.router.navigate(['/menutwo']);
    } else {
      // Find the index of the selected category
      const index = this.categories.findIndex((category: any) => category.categoryName === this.selectedCategory);

      // Navigate to the category page using its index
      if (index !== -1) {
        this.router.navigate(['/menutwo', index]);

        // Scroll to the selected category section after navigation
        if (this.categoryContainer) {
          const selectedCategorySection = this.categoryContainer.nativeElement.querySelector(`#categorySection_${index}`);
          if (selectedCategorySection) {
            selectedCategorySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    }
  }


  constructor(private appService: AppService, private router: Router, private viewportScroller: ViewportScroller, private activatedRoute: ActivatedRoute, private titleService: Title, private metaService: Meta) {
    this.templatetype = this.appService.getContentData('templatetype');
    this.multiMenu = this.appService.getContentData('menu')[0].menu[0];
    this.menu = this.appService.getContentData('menu')[0];
    this.categories = this.appService.getContentData('menu')[0].menu[0].superCategory ? this.appService.getContentData('menu')[0].menu[0].superCategory[0].category : [];
    this.categories2 = this.appService.getContentData('menu')[0].menu2 ? this.appService.getContentData('menu')[0].menu2[0].superCategory[0].category : [];
    this.categories3 = this.appService.getContentData('menu')[0].menu3 ? this.appService.getContentData('menu')[0].menu3[0].superCategory[0].category : [];
    this.menuImages = this.appService.getContentData('menuImages');
    this.categoryImages = this.appService.getContentData('categoryImages');
    this.menu2 = this.appService.getContentData('menu')[0].menu;
    this.brandName = this.appService.getContentData('brandName');
    this.website = this.appService.getContentData('type');
    this.contact = this.appService.getContentData('contact');
    this.social = this.appService.getContentData('social');
    this.css = this.appService.getContentData('css');
    this.logo = this.appService.getContentData('logo');
    this.address = this.appService.getContentData('address');
    this.lovedDishes = this.appService.getContentData('lovedDishes');
    this.sliderImage = this.appService.getContentData('slider');
    this.host = window.location.href.split('/');
    this.host = this.host[this.host.length - 1];
    this.hero = this.appService.getContentData('hero');
    this.navbar = this.appService.getContentData('navbar');
    this.mealCategory = this.appService.getContentData('menu')[0].menu[0].superCategory;
  }

  ngOnInit(): void {
    this.setTitleAndMetaTags();
    // Auto-select first category like gallery component
    if (this.brandName == 'ART iBrow Threading Salon' && this.categories && this.categories.length > 0) {
      this.getDiv(0, this.categories[0]);
    }
  }

  getDiv(index: any, item: any) {
    this.selectedCategory = item.categoryName === 'All' ? 'all' : index;
    if (item.items.length) {
      this.selectedCategoryName = item?.categoryName
      this.subCategories = item?.subCategories
      this.product = item;
      this.router.navigate([`/price/${this.host}`], { fragment: item.routeName });
    } else {
      this.product = undefined;
      this.router.navigate([`/price/${this.host}`]);
    }
  }

  onCategoryChange(index: number) {
    const selectedCategory = this.categories[index];
    this.getDiv(index, selectedCategory);
  }

  searchItems() {

    if (!this.searchText || this.searchText.trim() === '') {
      return;
    }
    this.showDiv = true;
    this.newItemsArr = []; // Clear the previous results
    this.matchingCategory = null; // Track the matching category


    this.categories.forEach((category: any) => {
      if (category.categoryName.toLowerCase().includes(this.searchText.toLowerCase())) {
        this.newItemsArr.push(...category.items);
      } else {
        const matchingItems = category.items.filter((item: any) =>
          item.itemName.toLowerCase().includes(this.searchText.toLowerCase())
        );
        this.newItemsArr.push(...matchingItems);
        this.matchingCategory = category;
      }
    });
  }

  erase() {
    this.showDiv = false;
    this.newItemsArr = [];
  }

  findMenuItem(itemName: string) {
    const imageFormats = ['.jpg', '.jpeg', '.png', '.gif'];
    this.menuItemFound = this.menuImages?.some((obj: any) => imageFormats.some((format: string) =>
      obj.imageName.toLowerCase().endsWith(format) && obj.imageName.toLowerCase().replace(format, '') === itemName.toLowerCase()
    ));

    if (this.menuItemFound) {
      this.menuItemImage = this.menuImages?.find((obj: any) => imageFormats.some((format: string) =>
        obj.imageName.toLowerCase().endsWith(format) && obj.imageName.toLowerCase().replace(format, '') === itemName.toLowerCase()
      ))?.icon;
    }

    return this.menuItemFound;
  }

  setTitleAndMetaTags(): void {
    this.titleService.setTitle('Affordable Beauty & Threading Services Pricing | ART iBrow');
    this.metaService.updateTag({
      name: 'description',
      content: 'Discover affordable pricing for beauty services at ART iBrow, including threading, eyebrow tinting, microblading, facials, waxing, permanent makeup, eyelash extensions, and more.'
    });
  }

}
