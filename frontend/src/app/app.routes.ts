import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
	// Redirect root page to home
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	// Component routes
	{ path: 'home', component: HomeComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'login', component: LoginComponent }
];
