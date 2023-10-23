import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp (email: string, confirmPassword:string): Observable<any> {
    const signUpURL = 'http://localhost:4000/auth/signup'
    return  this.http.post<any>(
      signUpURL,
      {
        email: email,
        password: confirmPassword,
      }
    )
  }
}
