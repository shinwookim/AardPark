import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { GeocodeLocation } from '../../data-classes/GeocodeLocation';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [],
  templateUrl: './create-listing.component.html',
  styleUrl: './create-listing.component.css'
})
export class CreateListingComponent {
	constructor(private apiService: ApiService) {}
	
	createListing() {
		this.apiService._getLatLonFromAddress("325 North Craig Street").subscribe({
			next: (data: GeocodeLocation) => {
				console.log(data);
			}
		})
	}
}
