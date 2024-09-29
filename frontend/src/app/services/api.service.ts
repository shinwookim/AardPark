import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ParkingSpot } from '../data-classes/ParkingSpot';
import { Availability } from '../data-classes/Availability';
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

	_newParkingSpot(name: string, lat: string, long: string, ownerId: string, price: number) {
		this.http.post(encodeURI(`${this.apiUrl}/parking-spot/?name=${name}&latitude=${lat}&longitude=${long}&owner_id=${ownerId}`));
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

	// TODO: after refactoring please change the return types in ts
	_getAvailability(spotId: string): Observable<Availability[]> {
		return this.http.get<Availability[]>(encodeURI(`${this.apiUrl}/parking-spot/${spotId}`));
	}

	_newAvailability(spotId: string, start: string, end: string) {
		this.http.post(encodeURI(`${this.apiUrl}/parking-spot/?parking_spot=${spotId}&start_time=${start}&end_time=${end}`));
	}

	_deleteAvailability(spotId: string, start: string, end: string) {
		this.http.delete(encodeURI(`${this.apiUrl}/parking-spot/?parking_spot=${spotId}&start_time=${start}&end_time=${end}`));
	}

	_getBooking(spotId: string): Observable<Booking[]> {
		return this.http.get<Booking[]>(encodeURI(`${this.apiUrl}/booking/`));
	}

	_newBooking(spotId: string, start: string, end: string, purchaser: string, seller: string) {
		this.http.post(encodeURI(`${this.apiUrl}/parking-spot/?purchaser=${purchaser}&seller=${seller}parking_spot=${spotId}&start_time=${start}&end_time=${end}`));
	}

	_getIndividualBooking(userId: string): Observable<Booking[]> {
		return this.http.get<Booking[]>(encodeURI(`${this.apiUrl}/booking/${userId}`));
	}
	
}
