import { Component } from '@angular/core';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [],
  templateUrl: './create-listing.component.html',
  styleUrl: './create-listing.component.css'
})
export class CreateListingComponent {
	constructor(private apiService: ApiServiceService) {}
	
	createListing() {
		this.apiService._getLatLonFromAddress("325 North Craig Street").subscribe({
			next: (data) => {
				console.log(data);
			}
		})
	}
}
