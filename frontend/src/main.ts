/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.prod';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

let googleMapsLoaded = false;
export function loadGoogleMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (googleMapsLoaded) {
      resolve();
      return;
    }

    if (typeof google !== 'undefined' && google.maps) {
      googleMapsLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      googleMapsLoaded = true;
      resolve();
    };

    script.onerror = (error) => {
      console.error('Failed to load Google Maps API', error);
      reject(error);
    };

    document.head.appendChild(script);
  });
}
