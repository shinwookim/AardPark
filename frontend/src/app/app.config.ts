import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAuth0 } from '@auth0/auth0-angular';
import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
		provideHttpClient(),
    provideAuth0({
      domain: 'dev-706qhrvchpeatoc8.us.auth0.com',
      clientId: 'grYiZAlXeaYe3uVdXwtgu96M562AMu98',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
		{
			provide: IMAGE_CONFIG,
			useValue: {
				disableImageSizeWarning: true, 
				disableImageLazyLoadWarning: true
			}
		},
  ]
};
