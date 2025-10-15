import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  @ViewChild('lightboxLink') lightboxLink!: ElementRef;
  public website: any;
  public host: any;
  public css: any;
  public page1: boolean = true;
  public page2: boolean = false;
  public page3: boolean = false;
  public page4: boolean = false;
  public success: boolean = false;
  public brandName: any;
  public hero: any;
  public social: any;
  public story: any;
  public resume: any;
  public videoResume: any;
  public templatetype: any;
  public display: boolean = false;
  public displaySocial: boolean = false;
  public formDisplay: string = 'none';
  public showMessage: string = "";
  public productList: any = [];
  public cakeFlavourList: any = [];
  hearOptions: string[] = ['Google', 'Instagram', 'Friend', 'Event', 'Other'];
  rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  gmbLink: string = 'https://www.google.com/search?sca_esv=180657c937ead09d&rlz=1C1CHBF_enIN1083IN1083&nfpr=1&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzTkb5QslDg2nTzUSvKDXY3LjlN9w6iczxDiUIB6LDNN3pSXvz0iy88Wb3PVHEFz8kBUZroPqgLj6QNUX91bAqGdvHbKSmmfF4QORZh_Cv_qTjEplTfEe9MHPj3atzJHfvtkM4jY%3D&q=Nepali+Momos+Brampton+Aslee+Momo%27s+Ki+Dukan+Reviews&sa=X&ved=2ahUKEwjHnsDU8qWMAxWs3TgGHQRmJ30Q0bkNegQILBAE&biw=1536&bih=730&dpr=1.25#lrd=0x882b1598b8898b17:0xa3dca7b710c9eb09,3,,,,';

  constructor(private appService: AppService, private router: Router, private titleService: Title, private metaService: Meta) {
    this.templatetype = this.appService.getContentData('templatetype')
    this.css = this.appService.getContentData('css');
    this.host = window.location.href.split('/');
    this.host = this.host[this.host.length - 1];
    this.brandName = this.appService.getContentData('brandName');
    this.hero = this.appService.getContentData('hero');
  }

  public userDetails = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    age: new FormControl(""),
    age_above_18: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    message: new FormControl(""),
    resume: new FormControl(""),
    videoResume: new FormControl(""),
  });

  public ratingForm = new FormGroup({
    rating: new FormControl(""),
  });

  public cakeOrderDetails = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    business: new FormControl(""),
    occasion: new FormControl(""),
    people: new FormControl(""),
    flavour: new FormControl(""),
    size: new FormControl(""),
    comment: new FormControl(""),
    info: new FormControl(""),
    file: new FormControl(""),
  });

  public bamForm = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    telephone: new FormControl(""),
    propertyName: new FormControl(""),
    location: new FormControl(""),
    websiteLink: new FormControl(""),
    message: new FormControl("")
  });

  public tiffinDetails = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    pax: new FormControl(""),
    meal: new FormControl("")
  });

  public assestsDetails = new FormGroup({
    name: new FormControl(""),
    bussinessName: new FormControl(""),
    title: new FormControl(""),
    phone: new FormControl(""),
    product: new FormControl([]),
    email: new FormControl(""),
    description: new FormControl("")
  });


  public airportDetails = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    date: new FormControl(""),
    fLocation: new FormControl(""),
    tLocation: new FormControl("")
  });

  public lobongoDetails = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    businessName: new FormControl(""),
    date: new FormControl("")
  });

  public herbalHeadSpaDetails = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    date: new FormControl(""),
    event_type: new FormControl(""),
    message: new FormControl("")
  });

  public arksTechnologiesDetails = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    position_type: new FormControl(""),
    message: new FormControl(""),
  });

  public roadgrillDetails = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    street: new FormControl(""),
    city: new FormControl(""),
    postalcode: new FormControl(""),
    date: new FormControl(""),
    starttime: new FormControl(""),
    endtime: new FormControl(""),
    guestcount: new FormControl(""),
    budget: new FormControl(""),
    host: new FormControl("Company"),
    message: new FormControl("")
  });

  public mintBack = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    message: new FormControl(""),
  });
  public userDetails2 = new FormGroup({
    firstName: new FormControl(""),
    lastName: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    businessName: new FormControl("")
  });

  public noorDetails = new FormGroup({
    name: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    subject: new FormControl(""),
    date: new FormControl(""),
    people: new FormControl(""),
    inquiry: new FormControl("How did you hear about us?"),
    message: new FormControl("")
  });

  public artiBrowDetails = new FormGroup({
    fullname: new FormControl(""),
    position: new FormControl(""),
    email: new FormControl(""),
    phone: new FormControl(""),
    message: new FormControl(""),
    file: new FormControl("")
  });

  public userDetails3 = new FormGroup({
    first_name: new FormControl(""),
    last_name: new FormControl(""),
    street_address: new FormControl(""),
    city: new FormControl(""),
    state: new FormControl(""),
    zip: new FormControl(""),
    home_phone: new FormControl(""),
    work_phone: new FormControl(""),
    cell_phone: new FormControl(""),
    email: new FormControl(""),
    dog_type_intrested_in: new FormControl(""),
    why_want_foster: new FormControl(""),
    abide_foster_rule: new FormControl(""),
    drive_to_vetvisit: new FormControl(""),
    expectations: new FormControl(""),
    employed: new FormControl(""),
    employed_job_type: new FormControl(""),
    employed_employee_name: new FormControl(""),
    have_spouse: new FormControl(""),
    spouse_name: new FormControl(""),
    spouse_employed: new FormControl(""),
    spouse_employed_number: new FormControl(""),
    people_live_with: new FormControl(""),
    family_knows: new FormControl(""),
    family_allergy_history: new FormControl(""),
    last_moved: new FormControl(""),
    fostered_before: new FormControl(""),
    fostered_history_description: new FormControl(""),
    owned_dogs: new FormControl(""),
    owned_dog_description: new FormControl(""),
    vet_references: new FormControl(""),
    vet_references_list: new FormControl(""),
    have_vet: new FormControl(""),
    vet_name: new FormControl(""),
    vet_address: new FormControl(""),
    vet_phone: new FormControl(""),
    dog_living_situation: new FormControl(""),
    guard_dog: new FormControl(""),
    dog_living_situation_other: new FormControl(""),
    dog_alone_hours: new FormControl(""),
    crate_dog_history: new FormControl(""),
    alone_dog_will_be: new FormControl(""),
    alone_dog_will_be_other: new FormControl(""),
    dog_excercise_type: new FormControl(""),
    excercise_often: new FormControl(""),
    excercise_other: new FormControl(""),
    live_in_a: new FormControl(""),
    yard_size: new FormControl(""),
    yard_enclosed: new FormControl(""),
    yard_fencing_type: new FormControl(""),
    where_is_home: new FormControl(""),
    restrictions_by_association: new FormControl(""),
    rent_permitted: new FormControl(""),
    landlord_name: new FormControl(""),
    landlord_phone: new FormControl(""),
    prefered_age: new FormControl(""),
    prefered_gender: new FormControl(""),
    prefered_size: new FormControl(""),
    prefered_breed: new FormControl(""),
    family_activity: new FormControl(""),
    pets_history_list: new FormControl(""),
    heartworm_knowledge: new FormControl(""),
    heartworm_history: new FormControl(""),
    convicted_of_animal_cruelty: new FormControl(""),
    convicted_of_animal_cruelty_explain: new FormControl(""),
    animal_impounded: new FormControl(""),
    animal_impounded_reclaimed: new FormControl(""),
    animal_impounded_reclaimed_whynot: new FormControl(""),
    given_up_pet: new FormControl(""),
    given_up_pet_explain: new FormControl(""),
    shepherds_experience: new FormControl(""),
    prepared_for_behavioral_issues: new FormControl(""),
    deal_breaker: new FormControl(""),
    precautions: new FormControl(""),
    looking_in_foster_dog: new FormControl(""),
    additional_comment: new FormControl(""),
    agreement: new FormControl("")
  });

  public cafeDetails2 = new FormGroup({
    firstName: new FormControl(""),
    email: new FormControl(""),
    city: new FormControl("")
  });

  public delhiBookDetails = new FormGroup({
    guests: new FormControl(""),
    date: new FormControl(""),
    time: new FormControl("")
  });

  ngOnInit(): void {
    this.productList = [
      { item_id: 1, item_text: 'Full Time' },
      { item_id: 2, item_text: 'Part Time' },
      { item_id: 3, item_text: 'Others (How Many Hours)' }
    ];
    this.cakeFlavourList = [
      { item_id: 1, item_text: 'Fresh Cream Strawberry' },
      { item_id: 2, item_text: 'Fresh Cream Mango Strawberry' },
      { item_id: 3, item_text: 'Fresh Cream Chocolate' },
      { item_id: 4, item_text: 'Fresh Cream Fruit' },
      { item_id: 5, item_text: 'Yogurt Cake' },
      { item_id: 6, item_text: 'Mocha Butter Cream' },
      { item_id: 7, item_text: 'Biscoff Cookie Butter' },
      { item_id: 8, item_text: 'Mint Chocolate' },
      { item_id: 9, item_text: 'Blueberry Yogurt' },
      { item_id: 10, item_text: 'Fraiser' },
      { item_id: 11, item_text: 'Tres Leches' },
      { item_id: 12, item_text: 'Choco Truffle' },
      { item_id: 13, item_text: 'Pistachio Cake' },
      { item_id: 14, item_text: 'Arabica Cake' },
      { item_id: 15, item_text: 'Passion Fruit Raspberry' },
      { item_id: 16, item_text: 'Tiramisu' },
      { item_id: 17, item_text: 'Mango Mousse' },
    ];

    this.display = true;
    this.website = this.appService.getContentData('type');
    this.css = this.appService.getContentData('css');
    this.social = this.appService.getContentData('social');
    this.story = this.appService.getContentData('story');
    this.setTitleAndMetaTags();
  }

  setTitleAndMetaTags(): void {
    if (this.brandName == "Nepali Momos Brampton") {
      this.titleService.setTitle('Wholesale Nepali Momos Canada | Nepali Momos Brampton');
      this.metaService.updateTag({ name: 'description', content: 'Offer authentic Himalayan momos at your business. Partner with Nepali Momos Brampton for wholesale, Ontario-made, handcrafted momos delivered across Canada.' });
    }
  }

  uploadImageArt(event: any) {
    let file = event.target.files[0];

    // Check if the file is a PDF
    if (file && file.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }

    this.appService.uploadImage(file).subscribe(res => {
      this.resume = res.data;
    });
  }

  submitRating() {
    console.log('Form Details:', this.ratingForm.value);
    if (this.rating < 5) {
      this.showJotForm();
    } else {
      window.open(this.gmbLink, '_blank');
    }
  }

  showJotForm() {
    this.loadJotFormScript();
    setTimeout(() => {
      this.lightboxLink.nativeElement.click();
    }, 500);
  }

  loadJotFormScript() {
    if (document.getElementById('jotform-script')) return;

    let script = document.createElement('script');
    script.id = 'jotform-script';
    script.src = 'https://form.jotform.com/static/feedback2.js';
    script.type = 'text/javascript';
    script.onload = () => {
      new (window as any).JotformFeedback({
        formId: '250841046383051',
        base: 'https://form.jotform.com/',
        windowTitle: 'Feedback Form',
        backgroundColor: '#fcecf0',
        fontColor: '#000000',
        type: '0',
        height: 500,
        width: 700,
        openOnLoad: false
      });
    };
    document.body.appendChild(script);
  }


  submitRecruitForm() {
    let body = {
      ...this.userDetails.value,
      resume: this.resume,
      videoResume: this.videoResume
    }
    this.appService.contactUsSubmission(body).subscribe(result => {
      this.success = true;
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    })
  }

  submitCakeForm() {
    let body = {
      ...this.cakeOrderDetails.value,
      file: this.resume
    }
    this.appService.contactUsSubmission(body).subscribe(result => {
      this.success = true;
    })
  }

  submitartiBrowDetails() {
    let body = {
      fullname: this.artiBrowDetails.value.fullname,
      position: this.artiBrowDetails.value.position,
      email: this.artiBrowDetails.value.email,
      phone: this.artiBrowDetails.value.phone,
      message: this.artiBrowDetails.value.message,
      file: this.resume
    }
    this.appService.careerSubmission(body).subscribe(result => {
      this.success = true;
    })
  }


  mintFormSubmit() {
    let body = {
      ...this.mintBack.value
    }
    this.appService.contactUsSubmission(body).subscribe(result => {
      this.router.navigate([`/success`]);
    });
  }

  nextPage2() {
    this.page1 = false;
    this.page2 = true;
  }
  nextPage3() {
    this.page2 = false;
    this.page3 = true;
  }
  nextPage4() {
    this.page3 = false;
    this.page4 = true;
  }

  previousPage1() {
    this.page1 = true;
    this.page2 = false;
  }
  previousPage2() {
    this.page2 = true;
    this.page3 = false;
  }
  previousPage3() {
    this.page3 = true;
    this.page4 = false;
  }

  open() {
    this.display = !this.display
    this.displaySocial = !this.displaySocial;
    this.formDisplay = 'none';
    this.router.navigate(['/home']);
  }

  contactFormBasicDetails = new FormGroup({
    name: new FormControl("name"),
    phone: new FormControl("phone"),
    email: new FormControl("email"),
    message: new FormControl("message"),
  });

  submitBasicContactForm() {
    let body = { ...this.contactFormBasicDetails.value };
    this.appService.contactUsSubmission(body).subscribe(result => {
      this.success = true;
    });

  }

  userDetailsthankslate = new FormGroup({
    name: new FormControl(""),
    phone: new FormControl(""),
    email: new FormControl(""),
    message: new FormControl("")
  });

  submit() {
    let body = {
      ...this.userDetailsthankslate.value
    }
    this.appService.contactUsSubmission(body).subscribe(result => {
      this.success = true;
    });
  }
}
