import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   showSignup = false;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     this.loginForm = this.fb.group({
//       email: ['', Validators.required, Validators.email],
//       password: ['', Validators.required,Validators.minLength(6)]
//     });
//   }

//   onSubmit() {
//     const email = this.loginForm.value.email;
//     const password = this.loginForm.value.password;
//     this.authService.login(email, password).subscribe(
//       res => {
//         // redirect to sales forecast page on successful login
//         this.router.navigate(['/sales-forecast']);
//       },
//       err => {
//         // show signup form if user not already registered
//         if (err.status === 404) {
//           this.showSignup = true;
//           this.loginForm.addControl('name', this.fb.control('', Validators.required));
//         }
//       }
//     );
//   }
// }





import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
