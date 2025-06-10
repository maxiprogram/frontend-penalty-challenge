import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-begin-page',
  templateUrl: './begin-page.html',
  styleUrl: './begin-page.css'
})
export class BeginPage {
  constructor(private router: Router) {

  }

  onClick() {
    this.router.navigateByUrl('/form-page');
  }
}
