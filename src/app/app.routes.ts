import { Routes } from '@angular/router';
import { BeginPage } from './begin-page/begin-page';
import { FormPage } from './form-page/form-page';
import { VideoPage } from './video-page/video-page';

export const routes: Routes = [
    {
        title: 'Главная',
        path: '',
        component: BeginPage
    },
    {
        title: 'Ввод данных',
        path: 'form-page',
        component: FormPage
    },
    {
        title: 'Видео',
        path: 'video-page',
        component: VideoPage
    },
    {
        path: '**',
        component: BeginPage
    }
];
