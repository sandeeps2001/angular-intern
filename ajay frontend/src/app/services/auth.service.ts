import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from "../auth"
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(password: string, confirmPassword:string, token: string): Observable<Auth> {
    const signUpURL = `${environment.apiURL}/register?token=${token}`
    
    return this.http.post<Auth>(
      signUpURL,
      {
        password: password,
        cpassword: confirmPassword,
      }
    )
  }

  signIn(email: string, password: string): Observable<Auth> {
    const signInURL = `${environment.apiURL}/login`

    return this.http.post<Auth>(
      signInURL,
      {
        email,
        password
      }
    )
  }

  logout(){
    const logoutURL = `${environment.apiURL}/logout`

    return this.http.post(
      logoutURL,
      ''
    )
  }

  currentUser():Observable<Auth>{
    const currentUserURL = `${environment.apiURL}/currentuser`

    return this.http.get<Auth>(
      currentUserURL
    )
  }
}
