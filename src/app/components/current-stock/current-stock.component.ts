import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CurrentStock } from '../../models/current-stock';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-current-stock',
  templateUrl: './current-stock.component.html',
  styleUrls: ['./current-stock.component.scss']
})
export class CurrentStockComponent implements OnInit {
  public currentStock: CurrentStock[] = [];
  public apiUrl: string = '';

  constructor(private router: Router, private http: HttpClient, private apiService: ApiService) {}

  goBack(): void {
    this.router.navigate(['/']); // navigates to the root route = LandingComponent
  }

  async ngOnInit(): Promise<void> {

    try {
      const base = this.apiService.getBaseUrl();
      const fullUrl = base + 'locations/getStockStatus';
      this.apiUrl = fullUrl;
    
      console.log("API URL:", this.apiUrl);

      this.http.get<any>(
        fullUrl,
        { 
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Language', 'IT-it'),
          observe: "response"
        }
      ).subscribe({
        next: (response: any) => {
          console.log(response);
          this.currentStock = response.body.currentStock as CurrentStock[];
        },
        error: error => {
          console.error('API request failed:', error);
          alert('Failed to retrieve current stock. Please try again.');
        }
      });
    } catch (err) {
      console.error('Failed to retrieve IP:', err);
      alert('Could not determine server address.');
    }
  }
}
