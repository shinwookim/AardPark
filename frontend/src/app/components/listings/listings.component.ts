import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MapViewComponent } from '../map-view/map-view.component';
import { ApiService } from '../../services/api.service';
import { ParkingSpot } from '../../data-classes/ParkingSpot';
import { ParkingListingsService } from '../../services/parking-listings.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { loadGoogleMapsScript } from '../../../main';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, MapViewComponent, GoogleMapsModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})

export class ListingsComponent implements OnInit {
	options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: -31, lng: 147 },
    zoom: 4,
		streetViewControl: false
  };

	isGoogleMapsLoaded: boolean = false;
  isListView: boolean = true;
	parkingListings!: ParkingSpot[];
	sampleParkingSpots: ParkingSpot[] = [
		new ParkingSpot(
			"001", 
			"2024/10/01 08:00", 
			"2024/10/01 18:00", 
			"15", 
			"Downtown Garage", 
			"Secure indoor parking in the heart of downtown.", 
			{
				type: "Point", 
				coordinates: [40.712776, -74.005974] // New York City coordinates
			}
		),
		new ParkingSpot(
			"002", 
			"2024/10/01 09:00", 
			"2024/10/01 17:00", 
			"20", 
			"Central Park Lot", 
			"Spacious outdoor parking near Central Park.", 
			{
				type: "Point", 
				coordinates: [40.785091, -73.968285] // Central Park, NYC coordinates
			}
		),
		new ParkingSpot(
			"003", 
			"2024/10/01 07:00", 
			"2024/10/01 19:00", 
			"10", 
			"Riverside Parking", 
			"Affordable parking with easy access to the riverside.", 
			{
				type: "Point", 
				coordinates: [40.803682, -73.967256] // Riverside Park, NYC coordinates
			}
		),
		new ParkingSpot(
			"004", 
			"2024/10/02 08:00", 
			"2024/10/02 20:00", 
			"18", 
			"Midtown Garage", 
			"Secure underground parking in Midtown Manhattan.", 
			{
				type: "Point", 
				coordinates: [40.754932, -73.984016] // Times Square, NYC coordinates
			}
		),
		new ParkingSpot(
			"005", 
			"2024/10/02 10:00", 
			"2024/10/02 22:00", 
			"25", 
			"Broadway Lot", 
			"Convenient parking next to Broadway theaters.", 
			{
				type: "Point", 
				coordinates: [40.759011, -73.984472] // Broadway, NYC coordinates
			}
		)
	];	

  constructor(
    private parkingListingsService: ParkingListingsService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    loadGoogleMapsScript()
      .then(() => {
        this.isGoogleMapsLoaded = true;
        this.initializeListings();
      })
      .catch((error) => {
        console.error('Google Maps API failed to load', error);
      });
  }

  initializeListings(): void {
    this.parkingListingsService.fetchParkingListings(
      '0',
      '0',
      '100000000',
      '2000/01/01 01:01',
      '3000/01/01 01:01'
    );

    this.parkingListingsService.getParkingListings().subscribe({
      next: (listings) => {
        this.parkingListings = this.sampleParkingSpots;
        this.cdRef.detectChanges();
      },
    });
  }

  toggleView(): void {
    this.isListView = !this.isListView;
  }
}