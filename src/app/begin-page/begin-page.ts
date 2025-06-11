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

  onClickStart() {
    this.router.navigateByUrl('/form-page');
  }

  onClickFullScreen() {
    //console.log('Try FullScreen', document);
    
    const item: any = document.documentElement;
    if (item.requestFullscreen) {
      item.requestFullscreen();
    } else if (item.webkitRequestFullscreen) { /* Safari */
      item.webkitRequestFullscreen();
    } else if (item.msRequestFullscreen) { /* IE11 */
      item.msRequestFullscreen();
    }
  }
}
