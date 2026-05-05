import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Define your two bases here (adjust if needed)
  private readonly privateBase = 'http://10.130.231.184:8080/orderMngrAX/restcall/';
  private readonly publicBase  = 'http://188.219.225.106:8070/orderMngrAX/restcall/';
  private readonly publicHosts = ['188.219.225.106'];
  private readonly privateHostSuffixes: string[] = [];
  private baseUrl: string = this.resolveBaseUrlFromBrowserHost();
  private preferPrivateByDetection = this.isPrivateHost(this.getBrowserHost());

  constructor() {}

  async initializeBaseUrl(): Promise<void> {
    const host = this.getBrowserHost();

    this.preferPrivateByDetection = this.isPrivateHost(host);
    this.baseUrl = this.preferPrivateByDetection ? this.privateBase : this.publicBase;

    console.log('Browser host:', host || '(unknown)');
    console.log('Default base URL set to:', this.baseUrl);
  }

  /**
   * Returns the base URL.
   * - If usePrivate is provided, it **overrides** detection (true = private, false = public).
   * - If omitted, returns the **detected default** from initializeBaseUrl().
   */
  getBaseUrl(usePrivate?: boolean): string {
    if (typeof usePrivate === 'boolean') {
      return usePrivate ? this.privateBase : this.publicBase;
    }
    return this.baseUrl; // detected default
  }

  usesPrivateBaseByDefault(): boolean {
    return this.preferPrivateByDetection;
  }

  private resolveBaseUrlFromBrowserHost(): string {
    return this.isPrivateHost(this.getBrowserHost()) ? this.privateBase : this.publicBase;
  }

  private getBrowserHost(): string {
    if (typeof window === 'undefined') {
      return '';
    }

    return window.location.hostname.toLowerCase();
  }

  private isPrivateHost(host: string): boolean {
    if (!host || this.publicHosts.includes(host)) {
      return false;
    }

    return (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
      this.privateHostSuffixes.some(suffix => host.endsWith(suffix))
    );
  }
}
