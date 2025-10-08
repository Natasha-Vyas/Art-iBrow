import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ART iBrow Threading Salon';
  public web: any;

  ngOnInit() {
    this.loadSiteSeal();
  }

  loadSiteSeal() {
    if (this.web === "ART iBrow Threading Salon") {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://www.rapidscansecure.com/siteseal/siteseal.js?code=64,BA813700E0ED8297781076AC01F939D228A524E4';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        console.log("Site Seal Script Loaded for ART iBrow Threading Salon");
      };
    }
  }

}
