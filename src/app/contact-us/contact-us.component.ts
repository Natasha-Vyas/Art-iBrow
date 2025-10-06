import { Component, OnInit, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public success: boolean = false;
  showOtherEventTypeInput = false;
  public website: any;
  public css: any;
  public address: any;
  public address2: any;
  public contact: any;
  public contactData: any;
  public contact2: any;
  public openingTimes: any;
  public email: any;
  public email2: any;
  public hero: any;
  public brandName: any;
  public social: any;
  public mapUrl: SafeResourceUrl;
  public map: any;
  public contactusemail: any;
  public addsubscribe: boolean = false;
  public story: any;
  public details: String = '';
  public CareerList: any = [];
  public locationList: any = [];
  public serviceList: any = [];
  public talkAboutList: any = [];
  public weekDays: any = [];
  public partTime: any = [];
  public overTime: any = [];
  public experienceList: any = [];
  public valueInt: number = 20;
  public resumeObj = {};
  public locationchoice: any;
  public resume: any;
  public templatetype: any;
  public convertedTime: any;
  public links: any;
  public footerText: any;
  public susmitoGraphyEventTypes: any;
  public sliderImage: any;
  public selectedService: any;
  public display: boolean = false;
  selectedDates: string[] = [];
  hearOptions = ['Google', 'Instagram', 'Friend', 'Event', 'Other'];
  isPopupVisible: boolean = false;
  currentVideoSrc: string = '';

  constructor(
    private appService: AppService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private titleService: Title,
    private metaService: Meta,
    private fb: FormBuilder
  ) {
    this.templatetype = this.appService.getContentData('templatetype');
    this.map = this.appService.getContentData('map');
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.map);
    this.story = this.appService.getContentData('story');
    this.brandName = this.appService.getContentData('brandName');
    this.address = this.appService.getContentData('address');
    this.address2 = this.appService.getContentData('address2');
    this.contact2 = this.appService.getContentData('contact2');
    this.contact = this.appService.getContentData('contact') ?? '';
    this.contactData = this.appService.getContentData('contactData') ?? '';
    this.css = this.appService.getContentData('css');
    this.email = this.appService.getContentData('email');
    this.email2 = this.appService.getContentData('email2');
    this.openingTimes = this.appService.getContentData('openingTimes');
    this.social = this.appService.getContentData('social');
    this.contactusemail = this.appService.getContentData('contactusemail');
    this.hero = this.appService.getContentData('hero');
    this.links = this.appService.getContentData('navbar').links;
    this.footerText = this.appService.getContentData('footerText');
    this.sliderImage = this.appService.getContentData('slider');
  }

  ngOnInit(): void {
    this.setTitleAndMetaTags();
    this.website = this.appService.getContentData('type');
    this.css = this.appService.getContentData('css');
  }

  setTitleAndMetaTags(): void {
    if (this.brandName == 'ART iBrow Threading Salon') {
      this.titleService.setTitle('Reach Out | Top Eyebrow Threading & Beauty Services Near You');
      this.metaService.updateTag({ name: 'description', content: 'Contact us to schedule your appointment for top eyebrow threading, eyebrow tinting, microblading, facials, permanent makeup, eyelash extensions, and more beauty services.', });
    }
  }

  validateNumberInput(event: KeyboardEvent) {
    const allowedChars = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '(',
      ')',
      ' ',
      '-',
      '.',
      '+',
    ];
    const inputChar = String.fromCharCode(event.charCode || event.keyCode);

    if (!allowedChars.includes(inputChar)) {
      event.preventDefault(); // Prevent entering the character if it's not allowed
    }
  }

  ibrowDetails = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[+]?[(]?[0-9]{1,4}[)]?[-s./0-9]*$'),
    ]),
    service: new FormControl('Select Service'),
    otherService: new FormControl(''),
    message: new FormControl(''),
  });

  ibrowDetailsSubmitForm() {
    let body = {
      ...this.ibrowDetails.value,
    };
    this.appService.contactUsSubmission(body).subscribe((result) => {
      this.success = true;
    });
  }
}
