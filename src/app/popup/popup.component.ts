import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public display: boolean = false;
  public isMobile: boolean = false;
  public popup: any;
  public css: any;

  constructor(private appService: AppService) {
    this.popup = this.appService.getContentData('popup');
    this.css = this.appService.getContentData('css');
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.openPopup();
    }, 4000);
  }

  openPopup() {
    this.display = !this.display;
  }

  closePopup() {
    this.display = false;
  }
}
