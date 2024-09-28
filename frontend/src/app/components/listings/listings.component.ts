import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MapViewComponent } from '../map-view/map-view.component';

interface ParkingListing {
  id: number;
  name: string;
  address: string;
  price: number;
  lat: number;
  lng: number;
  //TODO: images
}

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule, MapViewComponent],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})

export class ListingsComponent implements OnInit {
  isListView: boolean = true;
  parkingListings: ParkingListing[] = [
    {
      id: 1,
      name: "Downtown Parking Lot",
      address: "123 Main St, City, State 12345",
      price: 15,
      lat: 0,
      lng: 0
    },
    {
      id: 2,
      name: "Central Park Garage",
      address: "456 Park Ave, City, State 12345",
      price: 20,
      lat: 0,
      lng: 0
    },
    {
      id: 3,
      name: "Riverside Parking",
      address: "789 River Rd, City, State 12345",
      price: 10,
      lat: 0,
      lng: 0
    },
    {
      id: 4,
      name: "Central Park Garage",
      address: "456 Park Ave, City, State 12345",
      price: 20,
      lat: 0,
      lng: 0
    },
    {
      id: 5,
      name: "Riverside Parking",
      address: "789 River Rd, City, State 12345",
      price: 10,
      lat: 0,
      lng: 0
    }
  ];

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  toggleView():void {
    this.isListView = !this.isListView;
  }
}