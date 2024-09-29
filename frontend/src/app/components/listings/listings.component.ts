import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MapViewComponent } from '../map-view/map-view.component';
import { ApiService } from '../../services/api.service';
import { ParkingSpot } from '../../data-classes/ParkingSpot';
import { ParkingListingsService } from '../../services/parking-listings.service';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, MapViewComponent],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})

export class ListingsComponent implements OnInit {
  isListView: boolean = true;
	parkingListings!: ParkingSpot[];
  // parkingListings: ParkingListing[] = [
  //   {
  //     id: 1,
  //     name: "Downtown Parking Lot",
  //     address: "123 Main St, City, State 12345",
  //     price: 15,
  //     lat: 0,
  //     lng: 0
  //   },
  //   {
  //     id: 2,
  //     name: "Central Park Garage",
  //     address: "456 Park Ave, City, State 12345",
  //     price: 20,
  //     lat: 0,
  //     lng: 0
  //   },
  //   {
  //     id: 3,
  //     name: "Riverside Parking",
  //     address: "789 River Rd, City, State 12345",
  //     price: 10,
  //     lat: 0,
  //     lng: 0
  //   },
  //   {
  //     id: 4,
  //     name: "Central Park Garage",
  //     address: "456 Park Ave, City, State 12345",
  //     price: 20,
  //     lat: 0,
  //     lng: 0
  //   },
  //   {
  //     id: 5,
  //     name: "Riverside Parking",
  //     address: "789 River Rd, City, State 12345",
  //     price: 10,
  //     lat: 0,
  //     lng: 0
  //   }
  // ];

  constructor(private parkingListingsService: ParkingListingsService, private apiService: ApiService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
		this.parkingListingsService.fetchParkingListings("0", "0", "100000000", "2000/01/01 01:01", "3000/01/01 01:01");

		this.parkingListingsService.getParkingListings().subscribe({
      next: (listings) => {
        this.parkingListings = listings;
        this.cdRef.detectChanges();
      }
    });
  }

  toggleView(): void {
    this.isListView = !this.isListView;
  }
}