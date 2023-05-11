// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../app.component.css']
})
export class LoginComponent implements OnInit {
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
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.login(email, password).subscribe(
      res => {
        // redirect to sales forecast page on successful login
        this.router.navigate(['/sales-forecast']);
      },
      err => {
        // show signup form if user not already registered

        if (err.status == 400){
          this.messageService.add({ severity: 'error', summary: 'Invalid Email', detail: 'Please check your email' });
        }
        if (err.status === 401) {
          // this.showSignup = true;
          this.messageService.add({ severity: 'error', summary: 'Try SignUp', detail: 'Invalid UserName or Password' });
          // this.router.navigate(['/sales-forecast']);
          // this.loginForm.addControl('name', this.fb.control('', Validators.required));
        }
      }
    );
  }
}
