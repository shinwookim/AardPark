import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ParkingSpot } from '../data-classes/ParkingSpot';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingListingsService {
  private parkingListingsSubject = new BehaviorSubject<ParkingSpot[]>([]);
  public parkingListings$: Observable<ParkingSpot[]> = this.parkingListingsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  fetchParkingListings(lat: number, lon: number, radius: string, startTime: string, endTime: string): void {
    this.apiService._getParkingSpots(lat, lon, radius, startTime, endTime).subscribe({
      next: (data: ParkingSpot[]) => {
        this.parkingListingsSubject.next(data);
      },
      error: (error) => {
        console.error("Error fetching parking spots:", error);
      }
    });
  }

  getParkingListings(): Observable<ParkingSpot[]> {
    return this.parkingListings$;
  }
}
