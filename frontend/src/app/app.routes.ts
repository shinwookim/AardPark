import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ListingsComponent } from './components/listings/listings.component';
import { CreateListingComponent } from './components/create-listing/create-listing.component';

export const routes: Routes = [
	// Redirect root page to home
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	// Component routes
	{ path: 'home', component: HomeComponent },
	{ path: 'listings', component: ListingsComponent },
	{ path: 'create-listing', component: CreateListingComponent },
	{ path: 'login', component: LoginComponent }
];
