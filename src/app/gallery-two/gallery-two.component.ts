import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-two',
  templateUrl: './gallery-two.component.html',
  styleUrls: ['./gallery-two.component.scss']
})
export class GalleryTwoComponent implements OnInit {
  public website: any;
  public css: any;
  public host: any = [];
  public hero: any;
  public galleryBanner: any;
  public routeSubscription: any;
  public social: any;
  public brandName: any;
  public currentRouteParams: any;
  public currentIndex: number = 0;
  public gallery: any;
  public valentineGallery: any;
  public currentRoute: string | undefined;

  constructor(private appService: AppService, private router: Router, private activatedRoute: ActivatedRoute, private metaService: Meta, private titleService: Title,) {
    this.css = this.appService.getContentData('css');
    this.host = window.location.href.split('/');
    this.host = this.host[this.host.length - 1];
    this.brandName = this.appService.getContentData('brandName');
    this.hero = this.appService.getContentData('hero');
    this.website = this.appService.getContentData('type');
    this.social = this.appService.getContentData('social');
    this.gallery = this.appService.getContentData('gallery');
    this.valentineGallery = this.appService.getContentData('valentineGallery');

  }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const routeParts = this.router.url.split('/');
      this.currentRoute = routeParts.pop(); // .pop() returns the last item
    });

    if (this.activatedRoute.paramMap) {
      this.routeSubscription = this.activatedRoute.paramMap.subscribe(params => {
        const urlSegments = this.activatedRoute.snapshot.url;
        const lastSegment = urlSegments[urlSegments.length - 1].path;
        this.currentRouteParams = this.hero?.galleryContent?.filter((ele: any) => ele.key == lastSegment)[0];
      });
    }
  }

  playVideo(event: Event) {
    const videoElement = event.target as HTMLVideoElement;
    videoElement.play();
  }

  pauseVideo(event: Event) {
    const videoElement = event.target as HTMLVideoElement;
    videoElement.pause();
  }

  setTitleAndMetaTags(): void {
    if (this.brandName == "Latha Collections USA") {
      this.titleService.setTitle('Wedding Dresses & Lehenga Choli for Women | South Indian Dresses');
      this.metaService.updateTag({ name: 'description', content: 'Explore Latha Collections for stunning wedding dresses, traditional sarees, lehengas, pastel sarees, and kurtis. Shop party wear sarees and ethnic wear for women online.' });
    }

  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

}
