import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loginForm!: FormGroup;
  showSignup = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const name = this.loginForm.value.name;
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    console.log(name, email, password);
    this.authService.signup(name, email, password).subscribe(
      res => {
        // redirect to sales forecast page on successful login
        this.router.navigate(['/sales-forecast']);
      },
      err => {
        if (err.status == 400){
          this.messageService.add({ severity: 'error', summary: 'Invalid Email', detail: 'Please check your email' });
        }
        if (err.status === 401) {
          // this.showSignup = true;
          this.messageService.add({ severity: 'warn', summary: 'Already LoggedIn', detail: 'Try login' });
          // this.router.navigate(['/sales-forecast']);
          // this.loginForm.addControl('name', this.fb.control('', Validators.required));
        }
      }
    );
  }
}
