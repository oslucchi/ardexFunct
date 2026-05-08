import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(private router: Router) {}

  currentStock(): void {
    this.router.navigate(['/current-stock']);
  }

  shipmentCost(): void {
    this.router.navigate(['/shipment-costs']);
  }
}
