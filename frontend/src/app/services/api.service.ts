import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ParkingSpot } from '../data-classes/ParkingSpot';
import { Booking } from '../data-classes/Booking';
import { GeocodeLocation } from '../data-classes/GeocodeLocation';
import { BookingCollection } from '../data-classes/BookingCollection';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	private apiUrl = 'http://localhost:8000';
	private user!: User;

  constructor(private http: HttpClient, private auth: AuthService) {
		this.auth.user$.subscribe({
			next: (user) => {
				if (user) {
					this.user = user;
				}
			},
			error: (error) => {
				console.log("Login failed: ", error);
			}
		})
	}

	_getParkingSpots(lat: number, lon: number, radius: string, startTime?: string, endTime?: string): Observable<ParkingSpot[]> {
		let url = `${this.apiUrl}/parking-spot/?latitude=${lat}&longitude=${lon}&radius_in_miles=${radius}`
		if (startTime) url += `&start_time=${startTime}`;
		if (endTime) url += `&end_time=${endTime}`
    return this.http.get<ParkingSpot[]>(encodeURI(url));
  }
  
  _getParkingSpot(spotId: string): Observable<ParkingSpot> {
		return this.http.get<ParkingSpot>(encodeURI(`${this.apiUrl}/parking-spot/${spotId}`));
	}

	_newParkingSpot(name: string, desc: string, lat: number, long: number, start: string, end: string, price: string) {
		const params = 
			`name=${name}` +
			`&description=${desc}` +
			`&latitude=${lat}` +
			`&longitude=${long}` +
			`&owner_username=${this.user.email}` +
			`&start_time=${start}` +
			`&end_time=${end}` +
			`&price=${price}`;
	
		this.http.post(`${this.apiUrl}/parking-spot/?${params}`, {}).subscribe();
	}	

	_newBooking(spotId: string, start: string, end: string, seller: string) {
		// Concatenate query parameters for the POST request
		const postParams = 
			`purchaser=${this.user.email}` +
			`&seller=${seller}` +
			`&parking_spot=${spotId}` +
			`&start_time=${start}` +
			`&end_time=${end}`;
	
		// POST request with query parameters
		this.http.post(`${this.apiUrl}/booking/?${postParams}`, null).subscribe();
	
		// Concatenate query parameters for the PUT request
		const putParams = 
			`parking_spot=${spotId}` +
			`&start_time=${start}` +
			`&end_time=${end}`;
	
		// PUT request with query parameters
		this.http.put(`${this.apiUrl}/parking_spot_availability/?${putParams}`, null).subscribe();
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

	_getIndividualBooking(userId: string): Observable<BookingCollection> {
		return this.http.get<BookingCollection>(encodeURI(`${this.apiUrl}/booking/${userId}`));
	}
}

