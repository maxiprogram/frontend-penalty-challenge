import { Routes } from '@angular/router';
import { BeginPage } from './begin-page/begin-page';
import { FormPage } from './form-page/form-page';

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
        path: '**',
        component: BeginPage
    }
];
