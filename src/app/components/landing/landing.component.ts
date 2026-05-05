import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  usePrivate = false;
  showPrivateToggle = false; // controls visibility of the div

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.apiService.initializeBaseUrl();

    this.usePrivate = this.apiService.usesPrivateBaseByDefault();
    this.showPrivateToggle = false;
  }

  currentStock(): void {
    this.router.navigate(['/current-stock']);
  }

  shipmentCost(): void {
    console.log('routing to the shipment costs page with usePrivate:', this.usePrivate); 
    this.router.navigate(
      ['/shipment-costs'],
      { queryParams: { usePrivate: this.usePrivate ? 1 : 0 } }
    );
  }
}
