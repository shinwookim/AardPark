import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService, User } from '@auth0/auth0-angular';
import { Booking } from '../../data-classes/Booking';
import { BookingCollection } from '../../data-classes/BookingCollection';
import { ParkingSpot } from '../../data-classes/ParkingSpot';

@Component({
  selector: 'app-my-listings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-listings.component.html',
  styleUrl: './my-listings.component.css'
})


export class MyListingsComponent implements OnInit {
  soldListings: ParkingSpot[] = [];
	purchasedListings: ParkingSpot[] = [];
	private user!: User;

  constructor(private apiService: ApiService, private auth: AuthService) {};

	ngOnInit(): void {
		this.auth.user$.subscribe({
			next: (next) => {
				if (next) {
					this.user = next;
	
					if (this.user.email) {
						this.apiService._getIndividualBooking(this.user.email).subscribe({
							next: (data: BookingCollection) => {
								data.seller.forEach((booking: Booking) => {
									this.apiService._getParkingSpot(booking.parking_spot).subscribe({
										next: (spot: ParkingSpot) => {
											this.soldListings.push(spot);
										}
									});
								});
	
								data.purchaser.forEach((booking: Booking) => {
									this.apiService._getParkingSpot(booking.parking_spot).subscribe({
										next: (spot: ParkingSpot) => {
											this.purchasedListings.push(spot);
										}
									});
								});
							}
						});
					}
				}
			}
		});
	}	
}
