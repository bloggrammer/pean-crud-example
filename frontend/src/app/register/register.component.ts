import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  signupForm!: FormGroup;
  email?: string;
  password?: string;
  username?: string;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      email: ['', Validators.required ],
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    const credentials = {
      username: this.signupForm.get('name')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    }
    this.authService.register(credentials).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        window.location.href = '/login';
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
