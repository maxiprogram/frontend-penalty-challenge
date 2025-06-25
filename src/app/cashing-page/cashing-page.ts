import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cashing-page',
  imports: [],
  templateUrl: './cashing-page.html',
  styleUrl: './cashing-page.css'
})
export class CashingPage {
  baseUrl: string;

  constructor() {
    this.baseUrl = environment.URL_API.slice(0, -3) + 'videos/';
    //console.log(environment.URL_API);
    //console.log(this.baseUrl);
    
  }

  getArray() {
    return Array.from({length: 29}, (_, i) => i + 1);
  }

  getArray2() {
    return Array.from({length: 29}, (_, i) => i + 1);
  }
}
