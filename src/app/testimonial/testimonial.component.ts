import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../services/app.service';
import { HttpClient } from '@angular/common/http';
import { interval, Subscription } from 'rxjs';
interface Review {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
}
interface Testimonial {
  text: string;
  reviewerName: string;
  reviewerImage: string;
}

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  testimonialls: Testimonial[] = [];
  currenttTestimonial!: Testimonial;

  private autoScrollSubscription: Subscription | undefined;
  private autoScrollInterval: number = 5000; // 5 seconds
  public website: any;
  public css: any;
  public oliveTestimonials: any;
  public hero: any;
  public brandName: any;
  public testimonials_all: any;
  public currentTestimonial: any = 0;
  public currentReview: any = 0;
  public review: any = 0;
  public autoSlideInterval: any;
  public currentIndexSaiNaturals = 0;
  public reviews: Review[] = [];
  public visibleStart = 0;
  public autoSlideApiInterval: any;
  public currentIndex = 0;
  public intervalId: any;

  constructor(private appService: AppService, private http: HttpClient) {
    this.hero = this.appService.getContentData('hero');
    this.css = this.appService.getContentData('css');
    this.brandName = this.appService.getContentData('brandName');
    this.testimonials_all = this.appService.getContentData('testimonials');
  }

  ngOnInit(): void {
    // this.startAutoSlide();
  }

  ngOnDestroy() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.autoScrollSubscription) {
      this.autoScrollSubscription.unsubscribe();
    }
  }

}
