/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment.prod';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

function loadGoogleMapsScript() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

loadGoogleMapsScript();