import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GeocodeLocation } from '../../data-classes/GeocodeLocation';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-listing.component.html',
  styleUrl: './create-listing.component.css'
})
export class CreateListingComponent {
	title: string = "";
	location: string = "";
	description: string = "";
	price: string = "";
	start: string = "";
	end: string = "";

	constructor(private apiService: ApiService, private auth: AuthService, private router: Router) {}
	
	createListing() {
		this.apiService._getLatLonFromAddress(this.location).subscribe({
			next: (data: GeocodeLocation) => {
				this.apiService._newParkingSpot(this.title, this.description, data.lat, data.lng, this.formatDateTime(this.start), this.formatDateTime(this.end), this.price);
				this.router.navigate(['/']);
			}
		})
	}

	formatDateTime(dateString: string): string {
		const date = new Date(dateString);
	
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
	
		return `${year}/${month}/${day} ${hours}:${minutes}`;
	}
	
}
