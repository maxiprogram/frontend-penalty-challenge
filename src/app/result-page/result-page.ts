import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  imports: [],
  templateUrl: './result-page.html',
  styleUrl: './result-page.css'
})
export class ResultPage {
  result!: boolean;

  constructor(private readonly router: Router) {
    console.log('router.getCurrentNavigation()?.extras', router.getCurrentNavigation()?.extras);
    const extras = router.getCurrentNavigation()?.extras;
    if(extras?.state) {
      this.result = extras?.state['result_answer'];
    } else {
      this.router.navigateByUrl('begin-page');  
    }
  }

  onClickBegin() {
    this.router.navigateByUrl('begin-page');
  }

  onClickReplay() {
    this.router.navigateByUrl('video-page');
  }
}
