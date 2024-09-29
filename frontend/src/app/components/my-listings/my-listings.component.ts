import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Listing {
  name: string,
  description: string,
  owner: string,
  price: number,
  start_time: string,
  end_time: string
}

@Component({
  selector: 'app-my-listings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-listings.component.html',
  styleUrl: './my-listings.component.css'
})


export class MyListingsComponent {
  soldListings: Listing[] = [];

  purchasedListings: Listing[] = [
    {
      name: "Minhal's Driveway",
      description: "This is a driveway",
      owner: "tkocher61@gmail.com",
      price: 25,
      start_time: "2024/09/24 11:00",
      end_time: "2024/09/24 12:00"
    }
  ];

  formatDate(dateString: string): string {
		if (!dateString) return 'N/A';
		const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	}	

	formatTime(dateString: string): string {
		if (!dateString) return 'N/A';
		const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
		return new Date(dateString).toLocaleTimeString(undefined, options);
	}	

  constructor() {};


}
