import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class NaviagtionService {
  constructor(private router: Router) {}

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
