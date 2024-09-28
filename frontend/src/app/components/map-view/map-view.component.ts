/// <reference types="google.maps" />

import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-map-view',
  template: '<div #mapContainer style="width: 100%; height: 400px;"></div>',
  standalone: true
})
export class MapViewComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;
  @Input() parkingListings: any[] = [];

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 40.7128, lng: -74.0060 }, // New York City coordinates
      zoom: 12
    };

    const map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

    this.parkingListings.forEach(listing => {
      const marker = new google.maps.Marker({
        position: { lat: listing.lat, lng: listing.lng },
        map: map,
        title: listing.name
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<h3>${listing.name}</h3><p>${listing.address}</p><p>$${listing.price}/hr</p>`
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  }
}