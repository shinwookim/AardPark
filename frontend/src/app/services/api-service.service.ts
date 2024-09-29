import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

	private apiUrl = 'http://localhost:';

  constructor(private http: HttpClient, private auth: AuthService) { }

	_getLibrary(token: string): Observable<string> {
    return this.http.get<string>(this.apiUrl + `/library?token=${token}`);
  }
}
