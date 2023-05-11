// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5000';
//   private logged = false;
//   constructor(private http: HttpClient) { }
//   isLoggedIn(){
//     return this.logged;
//   }
//   login(email: string, password: string): Observable<any> {
//     this.logged = true;
//     return this.http.post(`${this.apiUrl}/login`, { email, password });
//   }

//   signup(name: string, email: string, password: string): Observable<any> {
//     this.logged = false;
//     return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
//   }
//   predict(file: FormData): Observable<any> {
//     return this.http.post(`${this.apiUrl}/predict`, file);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  private logged = false;
  constructor(private http: HttpClient) { }
  isLoggedIn(){
    return this.logged;
  }
  login(email: string, password: string): Observable<any> {
    this.logged = true;
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  signup(name: string, email: string, password: string): Observable<any> {
    this.logged = false;
    return this.http.post(`${this.apiUrl}/signup`, { name, email, password });
  }
  predict(file: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.apiUrl}/predict`, file, { headers });
  }
  // predict(formData: FormData): Observable<any> {
  //   const headers = new HttpHeaders();
  //   headers.append('enctype', 'multipart/form-data');
  //   headers.append('Accept', 'application/json');
  //   return this.http.post(`${this.apiUrl}/predict`, formData, { headers });
  // }
}
