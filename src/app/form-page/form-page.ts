import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.html',
  styleUrl: './form-page.css',
  imports: [ReactiveFormsModule],
})
export class FormPage {
  userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    sphere: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    //console.log('Send Data', this.firstName.value, this.lastName.value, this.email.value); 
    console.log('Send Data', this.userForm.value);
  }
}
