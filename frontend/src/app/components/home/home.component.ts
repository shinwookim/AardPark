import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
	searchString: string = "";

	constructor(private apiService: ApiService, private router: Router) {}

	quickSearch() {
		this.router.navigate(['/listings'], { queryParams: { search: this.searchString } });
	}
}
