import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = '/orderMngrAX/restcall/';

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
