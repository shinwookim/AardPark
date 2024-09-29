import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GeocodeLocation } from '../../data-classes/GeocodeLocation';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

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

	constructor(private apiService: ApiService, private auth: AuthService) {}
	
	createListing() {
		this.apiService._getLatLonFromAddress(this.location).subscribe({
			next: (data: GeocodeLocation) => {
				console.log(data);
				this.apiService._newParkingSpot(this.title, this.description, data.lat, data.lng, auth.email, this.start, this.end);
			}
		})


	}
}
