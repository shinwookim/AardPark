import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user!: User;
  menuOpen = false;
  
  constructor(private auth: AuthService, private elementRef: ElementRef) {}

  ngOnInit(): void {
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

  login() {
    this.auth.loginWithRedirect();
  }

  logout(): void {
		this.auth.logout({ logoutParams: { returnTo: document.location.origin } })
		this.menuOpen = false;
  }

  toggleMenu(event: MouseEvent): void {
		event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

	@HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.menuOpen = false; // Close the dropdown if clicked outside
    }
  }
}
