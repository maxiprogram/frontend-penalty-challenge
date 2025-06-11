import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface VideoData {
  url_video_short: string,
  url_video_full: string,
  answer: boolean,
}

@Component({
  selector: 'app-video-page',
  imports: [AsyncPipe],
  templateUrl: './video-page.html',
  styleUrl: './video-page.css'
})
export class VideoPage {
  private http = inject(HttpClient);
  videoData$!: Observable<VideoData>;
  responseVideoData!: VideoData;
  isShort: boolean = true;
  isShowButtons: boolean = false;
  private resultAnswer: boolean|undefined = undefined;
  @ViewChild('id_video') id_video!: any;


  constructor(private readonly router: Router) {
    effect(() => {
      this.videoData$ = this.http.get<VideoData>('http://localhost:3000/api/get-video');
      this.videoData$.subscribe((videoData) => {
        console.log('subscribe:', videoData);
        this.responseVideoData = videoData;
      })
    });
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
      const result = this.responseVideoData.answer === this.resultAnswer;
      console.log('result', result);
      this.router.navigateByUrl('result-page', { state: { result_answer: result }});
    }
  }

  onAnswer(answer: boolean) {
    this.resultAnswer = answer;
    this.isShowButtons = false;
    this.isShort = false;
  }

}
