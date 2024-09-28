import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

interface ParkingListing {
  id: number;
  name: string;
  address: string;
  price: number;
  //TODO: images
}

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})

export class ListingsComponent implements OnInit {
  parkingListings: ParkingListing[] = [
    {
      id: 1,
      name: "Downtown Parking Lot",
      address: "123 Main St, City, State 12345",
      price: 15
    },
    {
      id: 2,
      name: "Central Park Garage",
      address: "456 Park Ave, City, State 12345",
      price: 20
    },
    {
      id: 3,
      name: "Riverside Parking",
      address: "789 River Rd, City, State 12345",
      price: 10
    },
    {
      id: 4,
      name: "Central Park Garage",
      address: "456 Park Ave, City, State 12345",
      price: 20
    },
    {
      id: 5,
      name: "Riverside Parking",
      address: "789 River Rd, City, State 12345",
      price: 10
    }
  ];

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
}