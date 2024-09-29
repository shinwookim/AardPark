import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ParkingSpot } from '../data-classes/ParkingSpot';
import { Booking } from '../data-classes/Booking';
import { GeocodeLocation } from '../data-classes/GeocodeLocation';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private auth: AuthService) { }

	_getParkingSpots(lat: string, lon: string, radius: string, startTime: string, endTime: string): Observable<ParkingSpot[]> {
    	return this.http.get<ParkingSpot[]>(encodeURI(`${this.apiUrl}/parking-spot/?latitude=${lat}&longitude=${lon}&radius_in_miles=${radius}&start_time=${startTime}&end_time=${endTime}`));
  	}

	_newParkingSpot(parkingSpot: string, start: string, end: string) {
		let data = {"parking_spot": parkingSpot, "start_time": start, "end_time": end};
		this.http.put(encodeURI(`${this.apiUrl}/parking-spot/`), data);
	}

	_newBooking(spotId: string, start: string, end: string, purchaser: string, seller: string) {
		this.http.post(encodeURI(`${this.apiUrl}/booking/?purchaser=${purchaser}&seller=${seller}parking_spot=${spotId}&start_time=${start}&end_time=${end}`));

		let data = { "parking_spot": spotId, "start_time": start, "end_time": end};
		this.http.put(encodeURI(`${this.apiUrl}/parking_spot_availability/`), data);
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
	_getBooking(spotId: string): Observable<Booking[]> {
		return this.http.get<Booking[]>(encodeURI(`${this.apiUrl}/booking/`));
	}

	_getIndividualBooking(userId: string): Observable<Booking> {
		return this.http.get<Booking>(encodeURI(`${this.apiUrl}/booking/${userId}`));
	}
	
}
