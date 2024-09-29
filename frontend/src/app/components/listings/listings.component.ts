import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MapViewComponent } from '../map-view/map-view.component';
import { ParkingSpot } from '../../data-classes/ParkingSpot';
import { ParkingListingsService } from '../../services/parking-listings.service';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { loadGoogleMapsScript } from '../../../main';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, FormsModule, MapViewComponent, GoogleMapsModule],
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  options: google.maps.MapOptions = {
    mapId: "DEMO_MAP_ID",
    center: { lat: -31, lng: 147 },
    zoom: 4,
    streetViewControl: false
  };

  location: string = '';
  radius: string = '';
  startDate: string = '';
  endDate: string = '';

	searchedLat: number = 0;
	searchedLon: number = 0;

  isGoogleMapsLoaded: boolean = false;
  isListView: boolean = true;
  parkingListings: ParkingSpot[] = [];

  markers: any[] = [];
  selectedParkingSpot!: ParkingSpot;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

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
        this.options = {
          ...this.options,
          center: { lat: data.lat, lng: data.lng },
          zoom: 12
        };
				this.searchedLat = data.lat;
				this.searchedLon = data.lng;
        this.apiService._getParkingSpots(this.searchedLat, this.searchedLon, this.radius, this.startDate, this.endDate).subscribe({
          next: (data) => {
            this.parkingListings = data;
            this.generateMarkers();
          }
        });
      }
    });
  }

  generateMarkers(): void {
    this.markers = this.parkingListings.map(spot => ({
      position: {
        lat: spot.location.coordinates[0],
        lng: spot.location.coordinates[1]
      },
      title: spot.name,
      options: {
        animation: google.maps.Animation.DROP
      },
      spot: spot
    }));
  }

	openInfoWindow(marker: MapMarker, spot: ParkingSpot): void {
		this.selectedParkingSpot = spot;
		this.infoWindow.open(marker);
	}	

	calculateDistanceInMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
		const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
	
		const earthRadiusMiles = 3958.8; // Earth's radius in miles
	
		const dLat = toRadians(lat2 - lat1);
		const dLon = toRadians(lon2 - lon1);
	
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRadians(lat1)) *
				Math.cos(toRadians(lat2)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);

		return Math.round(earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
	}

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

	bookListing(listing: ParkingSpot) {
		this.apiService._newBooking(listing.parking_spot, listing.start_time, listing.end_time, listing.owner);
	}
}
