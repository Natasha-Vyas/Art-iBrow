import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public website: any;
  public faqs: any;
  public hero: any;
  public css: any;
  public success: boolean = false;
  public budget1: boolean = true;
  public budget2: boolean = false;
  public budget3: boolean = false;
  public contact: any;
  public sections1: any;
  public brandName: any;
  public sections = [
    {
      title: "What is the role of a construction consultant?",
      content: "A construction consultant provides expert advice, guidance, and support to clients throughout various stages of their construction projects. They help with project planning, design review, cost estimation, project management, quality control, and more.",
    },
    {
      title: "How can a construction consultant benefit my project?",
      content: "A construction consultant brings extensive industry knowledge, experience, and an objective perspective to your project. They can help you make informed decisions, optimize project plans, mitigate risks, enhance cost-effectiveness, and ensure project success.",
    },
    {
      title: "At what stage should I engage a construction consultant?",
      content: " It is beneficial to engage a construction consultant early in the project development phase, such as during pre-construction planning or design review. However, construction consultants can also be valuable at later stages to assist with project management, quality control, and problem-solving.",
    },
    {
      title: "How do I request a consultation with Selcon Construction Consulting?",
      content: "To request a consultation with Selcon Construction Consulting, please reach out to us via phone or email. Our team will be delighted to schedule a time to discuss your project, assess your needs, and provide expert insights and recommendations.",
    }
  ];

  public qualityCarsSections = [
    {
      title: "How can i drop the rental car?",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat adipiscing dolgedo.",
      showContent: false
    },
    {
      title: "What happen if i crash the car?",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat adipiscing dolgedo.",
      showContent: false
    },
    {
      title: " How to reserved a car here?",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat adipiscing dolgedo.",
      showContent: false
    },
    {
      title: "Do you have VIP access to airport?",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat adipiscing dolgedo.",
      showContent: false
    },
    {
      title: "What happen if i crash the car?",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat adipiscing dolgedo.",
      showContent: false
    },
    {
      title: "How can i select a car rent?",
      content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat adipiscing dolgedo.",
      showContent: false
    }
  ];

  constructor(private appService: AppService, private titleService: Title, private metaService: Meta) {
    this.website = this.appService.getContentData('type');
    this.css = this.appService.getContentData('css');
    this.contact = this.appService.getContentData('contact');
    this.faqs = this.appService.getContentData('faq');
    this.hero = this.appService.getContentData('hero');
    this.sections1 = this.appService.getContentData('sections');
    this.brandName = this.appService.getContentData('brandName');
  }

  ngOnInit(): void {
    this.setTitleAndMetaTags();
    // Initialize all FAQs as closed
    if (this.faqs && this.faqs.length > 0) {
      this.faqs.forEach((faq: any) => {
        faq.open = false;
      });
    }
  }

  setTitleAndMetaTags(): void {
    if (this.brandName == "ART iBrow Threading Salon") {
      this.titleService.setTitle('Best Eyebrow Threading & Beauty Services Near You | Art IBrow FAQs');
      this.metaService.updateTag({ name: 'description', content: 'Find answers to your questions about eyebrow threading, tinting, microblading, facials, permanent makeup, and more at ART iBrow. Discover the top-rated beauty salon near you.' });
    }
  }

  toggleAnswer(faq: any) {
    faq.open = !faq.open;
  }

  toggleContent(index: number) {
    this.qualityCarsSections.forEach((section: any, i: number) => {
      if (i === index) {
        section.showContent = !section.showContent;
      } else {
        section.showContent = false;
      }
    });
  }

  toggleContent2(index: number) {
    this.sections1.forEach((section: any, i: number) => {
      if (i === index) {
        section.showContent = !section.showContent;
      } else {
        section.showContent = false;
      }
    });
  }

  showTab1() {
    this.budget1 = true;
    this.budget2 = false;
    this.budget3 = false;
  }

  showTab2() {
    this.budget1 = false;
    this.budget2 = true;
    this.budget3 = false;
  }

  showTab3() {
    this.budget1 = false;
    this.budget2 = false;
    this.budget3 = true;
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

}
