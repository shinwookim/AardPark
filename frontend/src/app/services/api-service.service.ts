import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

	private apiUrl = 'http://localhost:';

  constructor(private http: HttpClient, private auth: AuthService) { }

	_getLibrary(token: string): Observable<string> {
    return this.http.get<string>(this.apiUrl + `/library?token=${token}`);
  }

	_getLatLonFromAddress(address: string): Observable<string> {
		return this.http.get<string>(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.replaceAll(" ", "+")}&key=${environment.googleMapsApiKey}`);
	}
}
