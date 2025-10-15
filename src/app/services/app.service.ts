import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as artiBrowData from '../../assets/data/artiBrow.json';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public data: any;
    public website: any;
    public formCode: any;
    public reservationFormCode: any;
    public favIcon: HTMLLinkElement | null = document.querySelector('#appIcon');

    constructor(private http: HttpClient) {
        // Initialize with default data
        this.data = artiBrowData;
        this.website = 'artibrow.com';
        this.formCode = 'L99baKSON';
    }

    getData(website: any) {
        switch (website) {
            case 'artibrow.com':
            case 'www.artibrow.com':
                if (this.favIcon) {
                    this.favIcon.href = './assets/favicon.png';
                }
                this.formCode = 'Vmn05XNC';
                return artiBrowData;

            default:
                return artiBrowData;
        }
    }

    getContentData(key: string): any {
        // Get data from the JSON file based on the key
        if (this.data && this.data[key]) {
            return this.data[key];
        }

        // Fallback for specific keys that might be needed
        const fallbackData: { [key: string]: any } = {
            templatetype: this.data?.type || 'template6new',
            hero: this.data?.hero || {},
            social: this.data?.social || {},
            story: this.data?.story || {},
            blogs: this.data?.story || {}, // Using story data for blogs
            brandName: this.data?.brandName || 'Maja Indian Cuisine',
            css: this.data?.css || {},
            type: this.data?.type || 'template6new'
        };

        return fallbackData[key] || null;
    }


    contactUsSubmission(data: any): Observable<any> {
        let requestBody = {
            ...data,
            type: 'Contact Us'
        };
        return this.http.post(
            `https://submit-form.com/${this.formCode}`,
            requestBody
        );
    }
    cateringInquiry(data: any): Observable<any> {
        let requestBody = {
            ...data,
            type: 'Catering Inquiry'
        };
        return this.http.post(
            `https://submit-form.com/${this.formCode}`,
            requestBody
        );
    }

    careerSubmission(data: any): Observable<any> {
        let requestBody = {
            ...data,
            type: 'Careers'
        };
        return this.http.post(
            `https://submit-form.com/${this.formCode}`,
            requestBody
        );
    }

    uploadImage(data: any): Observable<any> {
        let formData = new FormData();
        formData.append('image', data);
        return this.http.post(
            `https://appapi.ghc.health/api/progress/upload`,
            formData
        );
    }
}