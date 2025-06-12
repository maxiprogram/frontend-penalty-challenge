import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

interface VideoData {
  url_video_short: string,
  url_video_full: string,
  answer: boolean,
}

@Component({
  selector: 'app-video-page',
  imports: [],
  templateUrl: './video-page.html',
  styleUrl: './video-page.css'
})
export class VideoPage implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  //videoData$!: Observable<VideoData>;
  responseVideoData: VideoData|undefined = undefined;
  isShort: boolean = true;
  isShowButtons: boolean = false;
  isLoaded = signal(false);
  private resultAnswer: boolean|undefined = undefined;
  private idSubscription!: Subscription;
  private idUser!: number;
  @ViewChild('id_video') id_video!: any;


  constructor(
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    // effect(() => {
    //   console.log('onEffect');
    //   this.videoData$ = this.http.get<VideoData>(`${environment.URL_API}/get-video`);
    //   this.videoData$.subscribe((videoData) => {
    //     console.log('subscribe:', videoData);
    //     this.responseVideoData = videoData;
    //   })
    // });

    //console.log('router.getCurrentNavigation()?.extras', router.getCurrentNavigation()?.extras);
    const extras = router.getCurrentNavigation()?.extras;
    if(extras?.state) {
      this.idUser = extras?.state['id_user'];
    } else {
      console.log('redirect', extras);
      this.router.navigateByUrl('begin-page');  
    }
  }

  ngOnInit() {
    this.idSubscription = this.http.get<VideoData>(`${environment.URL_API}/get-video`).subscribe((resp) => {
      console.log('resp:', resp);
      this.responseVideoData = resp;
      this.isLoaded.set(true);
      //this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    if(this.idSubscription) {
      //console.log('this.idSubscription.unsubscribe()');
      this.idSubscription.unsubscribe();
    }
  }

  VideoPlay() {
    console.log('VideoPlay()', this.id_video);

    //this.id_video.nativeElement.autoplay = true;
    //this.id_video.nativeElement.play();
  }

  onVideoEnded() {
    console.log(`onVideoEnded() isShort:${this.isShort}`);
    if(this.isShort) {
      this.isShowButtons = true;
    } else {
      console.log('this.responseVideoData', this.responseVideoData);
      const result = this.responseVideoData?.answer === this.resultAnswer;
      console.log('result', result, this.idUser);
      this.router.navigateByUrl('result-page', {
        state: {
          result_answer: result,
          id_user: this.idUser
        }
      });
    }
  }

  onAnswer(answer: boolean) {
    this.resultAnswer = answer;
    this.isShowButtons = false;
    this.isShort = false;
  }

}
