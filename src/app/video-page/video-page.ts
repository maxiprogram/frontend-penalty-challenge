import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, effect, inject } from '@angular/core';
import { Observable } from 'rxjs';

interface VideoData {
  url_video_short: string,
  url_video_full: string,
  answer_true: boolean,
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

  
  constructor() {
    effect(() => {
      this.videoData$ = this.http.get<VideoData>('http://localhost:3000/api/get-video');
    });
  }

}
