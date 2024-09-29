import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ParkingSpot } from '../data-classes/ParkingSpot';
import { GeocodeLocation } from '../data-classes/GeocodeLocation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private auth: AuthService) { }

	_getParkingSpots(lat: number, lon: number, radius: string, startTime?: string, endTime?: string): Observable<ParkingSpot[]> {
		let queryParams = `latitude=${lat}&longitude=${lon}&radius_in_miles=${radius}`;
		if (startTime) queryParams += `&start_time=${encodeURIComponent(startTime)}`;
		if (endTime) queryParams += `&end_time=${encodeURIComponent(endTime)}`;
		return this.http.get<ParkingSpot[]>(`${this.apiUrl}/parking-spot/?${queryParams}`);
	}	

	_getLatLonFromAddress(address: string): Observable<GeocodeLocation> {
		const formattedAddress = address.replaceAll(" ", "+");
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${environment.googleMapsApiKey}`;
	
		return this.http.get<any>(url).pipe(
			map(response => {
				const lat = response.results[0]?.geometry?.location?.lat ?? 0;
				const lng = response.results[0]?.geometry?.location?.lng ?? 0;
				return new GeocodeLocation(lat, lng);
			})
		);
	}
	
}
