import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.html',
  styleUrl: './form-page.css',
  imports: [ReactiveFormsModule],
})
export class FormPage implements OnDestroy {
  private http = inject(HttpClient);
  private idSubscription!: Subscription
  isLoading = signal(false);


  constructor(private readonly router: Router) {

  }

  ngOnDestroy() {
    if(this.idSubscription) {
      this.idSubscription.unsubscribe();
    }
  }

  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    sphere: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log('Send Data', this.userForm.value);
    
    this.isLoading.set(true);
    this.idSubscription = this.http.post(`${environment.URL_API}/append`, {
      nameSheet: 'SheetA',
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      sphere: this.userForm.value.sphere,
    }).subscribe((resp: any) => {
      console.log('resp', resp);
      if(resp.status === 'ok') {
        this.router.navigateByUrl('/video-page');
      }
    });
  }
}
