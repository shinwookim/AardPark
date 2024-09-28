import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const routes: Routes = [
	// Redirect root page to home
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	// Component routes
	{ path: 'home', component: HomeComponent },
	{ path: 'sign-up', component: SignUpComponent },
];
