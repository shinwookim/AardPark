import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
	// Redirect root page to home
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	// Component routes
	{ path: 'home', component: HomeComponent },
];
