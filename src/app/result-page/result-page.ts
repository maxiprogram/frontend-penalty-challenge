import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-result-page',
  imports: [],
  templateUrl: './result-page.html',
  styleUrl: './result-page.css'
})
export class ResultPage implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private idSubscription!: Subscription;
  resultAnswer!: boolean;
  idUser!: number;
  idWin: string|undefined = undefined;
  isLoaded = signal(false);
  nameSheet: string;
  idTimer: number|undefined = undefined;

  constructor(private readonly router: Router) {
    //console.log('router.getCurrentNavigation()?.extras', router.getCurrentNavigation()?.extras);
    this.nameSheet = environment.NAME_SHEET;
    if(this.nameSheet === 'SheetS') {
      this.startTimer();
    }

    const extras = this.router.getCurrentNavigation()?.extras;
    if(extras?.state) {
      this.idUser = extras?.state['id_user'];
      this.resultAnswer = extras?.state['result_answer'];

      if(this.resultAnswer) {
        //UPDATE
        this.idSubscription = this.http.post(`${environment.URL_API}/update`, {
              nameSheet: environment.NAME_SHEET,
              idUser: this.idUser,
            }).subscribe((resp: any) => {
              console.log('resp', resp);
              if(resp.status === 'ok') {
                switch (environment.NAME_SHEET) {
                  case 'SheetA':
                    this.idWin = 'A';
                    break;
                  case 'SheetB':
                    this.idWin = 'B';
                    break;
                  case 'SheetC':
                    this.idWin = 'C';
                    break;
                  case 'SheetS':
                    this.idWin = 'S';
                    break;
                }
                this.idWin += resp.id_win;
                this.isLoaded.set(true);
              }
            });
      } else {
        this.isLoaded.set(true);
      }

    } else {
      console.log('redirect', extras)
      this.router.navigateByUrl('begin-page');  
    } 
  }

  ngOnInit() {
  }


  ngOnDestroy() {
    if(this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
  }

  onClickBegin() {
    if(this.idTimer !== undefined) {
      clearTimeout(this.idTimer);
    }
    this.router.navigateByUrl('begin-page');
  }

  onClickReplay() {
    if(this.idTimer !== undefined) {
      clearTimeout(this.idTimer);
    }
    this.router.navigateByUrl('video-page', {
      state: {
        id_user: this.idUser
      }
    });
  }

  startTimer() {
    this.idTimer = setTimeout(() => {
      window.location.assign('https://boom-conference.com/');
    }, 60000);
  }
}
