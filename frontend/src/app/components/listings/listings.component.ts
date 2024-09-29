import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MapViewComponent } from '../map-view/map-view.component';
import { ParkingSpot } from '../../data-classes/ParkingSpot';
import { ParkingListingsService } from '../../services/parking-listings.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { loadGoogleMapsScript } from '../../../main';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, FormsModule, MapViewComponent, GoogleMapsModule], // <-- Add FormsModule
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})

export class ListingsComponent implements OnInit {
  // Map options
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: -31, lng: 147 },
    zoom: 4,
    streetViewControl: false
  };

  // Fields for binding form inputs
  location: string = '';
  radius: string = '';
  startDate: string = '';
  endDate: string = '';

  isGoogleMapsLoaded: boolean = false;
  isListView: boolean = true;
  parkingListings!: ParkingSpot[];

  constructor(
    private parkingListingsService: ParkingListingsService,
    private cdRef: ChangeDetectorRef,
    private apiService: ApiService,
		private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    loadGoogleMapsScript()
      .then(() => {
        this.isGoogleMapsLoaded = true;
        this.parkingListingsService.getParkingListings().subscribe({
          next: (listings) => {
            this.parkingListings = listings;
            this.cdRef.detectChanges();
          },
        });
      })
      .catch((error) => {
        console.error('Google Maps API failed to load', error);
      });

		this.route.queryParams.subscribe(params => {
			this.location = params['search'] || '';
			this.radius = "10000";
			this.queryParkingSpots();
		});
  }

  toggleView(): void {
    this.isListView = !this.isListView;
  }

  queryParkingSpots(): void {
		this.apiService._getLatLonFromAddress(this.location).subscribe({
			next: (data) => {
				this.apiService._getParkingSpots(data.lat, data.lng, this.radius, this.startDate, this.endDate).subscribe({
					next: (data) => {
						this.parkingListings = data;
					}
				})
			}
		})
  }
}
