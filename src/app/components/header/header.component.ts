import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NaviagtionService } from '../../services/navigation/naviagtion.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private n: NaviagtionService) {}

  navigateTo(route: string) {
    this.n.navigate(route);
  }

  options = false;
  hovering() {
    this.options = true;
  }
  nonHovering() {
    this.options = false;
  }
}
