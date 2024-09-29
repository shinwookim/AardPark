import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
	constructor(private apiService: ApiService) {}

	quickSearch() {
	}
}
